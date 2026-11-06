import os
import gzip
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import matplotlib.pyplot as plt
import json
from PIL import Image

print("TensorFlow Version:", tf.__version__)

CLASS_NAMES = [
    'T-shirt/top',
    'Trouser',
    'Pullover',
    'Dress',
    'Coat',
    'Sandal',
    'Shirt',
    'Sneaker',
    'Bag',
    'Ankle boot'
]

CLASS_NAMES_ES = [
    'Camiseta / Top',
    'Pantalón',
    'Jersey / Suéter',
    'Vestido',
    'Abrigo',
    'Sandalia',
    'Camisa',
    'Zapatilla deportiva',
    'Bolso / Cartera',
    'Botín'
]

def load_mnist_local(path, kind='train'):
    labels_path = os.path.join(path, f'{kind}-labels-idx1-ubyte.gz')
    images_path = os.path.join(path, f'{kind}-images-idx3-ubyte.gz')

    with gzip.open(labels_path, 'rb') as lbpath:
        labels = np.frombuffer(lbpath.read(), dtype=np.uint8, offset=8)

    with gzip.open(images_path, 'rb') as imgpath:
        images = np.frombuffer(imgpath.read(), dtype=np.uint8, offset=16).reshape(len(labels), 784)

    return images, labels

def main():
    data_dir = os.path.join(os.path.dirname(__file__), 'fashion-mnist', 'data', 'fashion')
    print("Loading data from:", data_dir)
    
    if os.path.exists(data_dir):
        X_train_raw, y_train = load_mnist_local(data_dir, kind='train')
        X_test_raw, y_test = load_mnist_local(data_dir, kind='t10k')
    else:
        print("Local data not found, loading from keras.datasets...")
        (X_train_raw, y_train), (X_test_raw, y_test) = keras.datasets.fashion_mnist.load_data()
        X_train_raw = X_train_raw.reshape(-1, 784)
        X_test_raw = X_test_raw.reshape(-1, 784)

    print(f"X_train shape: {X_train_raw.shape}, y_train: {y_train.shape}")
    print(f"X_test shape: {X_test_raw.shape}, y_test: {y_test.shape}")

    # Normalize to [0, 1] and reshape to 28x28x1
    X_train = (X_train_raw.astype(np.float32) / 255.0).reshape(-1, 28, 28, 1)
    X_test = (X_test_raw.astype(np.float32) / 255.0).reshape(-1, 28, 28, 1)

    # High-performance Fast CNN Architecture
    model = keras.Sequential([
        layers.Input(shape=(28, 28, 1)),
        layers.Conv2D(32, (3, 3), activation='relu', padding='same'),
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.2),

        layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.25),

        layers.Flatten(),
        layers.Dense(128, activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(0.35),
        layers.Dense(10, activation='softmax')
    ])

    model.compile(
        optimizer=keras.optimizers.Adam(learning_rate=0.0015),
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )
    model.summary()

    # Train with batch_size=256 for fast vectorization
    print("Training CNN model...")
    history = model.fit(
        X_train, y_train,
        validation_split=0.1,
        epochs=4,
        batch_size=256,
        verbose=1
    )

    test_loss, test_acc = model.evaluate(X_test, y_test, verbose=0)
    print(f"\nFinal Test Loss: {test_loss:.4f}, Test Accuracy: {test_acc*100:.2f}%")

    # Create directories
    os.makedirs('model', exist_ok=True)
    os.makedirs('sample_images', exist_ok=True)
    os.makedirs('static_assets', exist_ok=True)

    # Save model
    model_path = os.path.join('model', 'fashion_mnist_cnn.keras')
    model.save(model_path)
    print(f"Model saved to {model_path}")

    # Save reference samples for comparison module (20 per class from test set)
    ref_images = []
    ref_labels = []
    ref_names = []
    
    samples_saved_per_class = {i: 0 for i in range(10)}

    for i in range(len(y_test)):
        cls = int(y_test[i])
        if samples_saved_per_class[cls] < 20:
            ref_images.append(X_test[i].reshape(28, 28))
            ref_labels.append(cls)
            ref_names.append(CLASS_NAMES[cls])
            
            # Save the first 2 of each class as test PNGs
            if samples_saved_per_class[cls] < 2:
                sample_filename = f"sample_{cls}_{CLASS_NAMES[cls].replace('/', '_').lower()}_{samples_saved_per_class[cls]+1}.png"
                img_array = (X_test[i].reshape(28, 28) * 255).astype(np.uint8)
                img = Image.fromarray(img_array, mode='L')
                img.resize((140, 140), Image.NEAREST).save(os.path.join('sample_images', sample_filename))

            samples_saved_per_class[cls] += 1
        
        if all(count >= 20 for count in samples_saved_per_class.values()):
            break

    np.savez_compressed(
        os.path.join('model', 'reference_samples.npz'),
        images=np.array(ref_images),
        labels=np.array(ref_labels),
        names=np.array(ref_names)
    )
    print("Saved reference samples to model/reference_samples.npz")

    # Save training metrics history
    metrics_data = {
        'accuracy': [float(x) for x in history.history['accuracy']],
        'val_accuracy': [float(x) for x in history.history['val_accuracy']],
        'loss': [float(x) for x in history.history['loss']],
        'val_loss': [float(x) for x in history.history['val_loss']],
        'test_accuracy': float(test_acc),
        'test_loss': float(test_loss),
        'classes': CLASS_NAMES,
        'classes_es': CLASS_NAMES_ES
    }
    with open(os.path.join('model', 'metrics.json'), 'w') as f:
        json.dump(metrics_data, f, indent=2)
    print("Saved metrics to model/metrics.json")

    # Generate Confusion Matrix
    y_pred_probs = model.predict(X_test, verbose=0)
    y_pred = np.argmax(y_pred_probs, axis=1)

    from sklearn.metrics import confusion_matrix, classification_report
    cm = confusion_matrix(y_test, y_pred)
    report = classification_report(y_test, y_pred, target_names=CLASS_NAMES, output_dict=True)

    with open(os.path.join('model', 'classification_report.json'), 'w') as f:
        json.dump(report, f, indent=2)

    plt.figure(figsize=(9, 7))
    plt.imshow(cm, interpolation='nearest', cmap=plt.cm.Blues)
    plt.title('Matriz de Confusión - CNN Fashion-MNIST')
    plt.colorbar()
    tick_marks = np.arange(len(CLASS_NAMES))
    plt.xticks(tick_marks, CLASS_NAMES, rotation=45, ha='right')
    plt.yticks(tick_marks, CLASS_NAMES)

    thresh = cm.max() / 2.
    for i in range(cm.shape[0]):
        for j in range(cm.shape[1]):
            plt.text(j, i, format(cm[i, j], 'd'),
                     ha="center", va="center",
                     color="white" if cm[i, j] > thresh else "black")

    plt.ylabel('Etiqueta Verdadera')
    plt.xlabel('Etiqueta Predicha')
    plt.tight_layout()
    plt.savefig(os.path.join('static_assets', 'confusion_matrix.png'), dpi=150)
    plt.close()
    print("Saved confusion matrix plot to static_assets/confusion_matrix.png")

if __name__ == '__main__':
    main()
