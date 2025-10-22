from multiprocessing import Queue
from PIL import Image
import os

def producer(queue: Queue, input_dir: str):
    """
    Reads images from input_dir, creates thumbnails, and pushes them into the queue.
    """
    for filename in os.listdir(input_dir):
        if filename.lower().endswith((".jpg", ".jpeg", ".png")):
            img_path = os.path.join(input_dir, filename)
            try:
                with Image.open(img_path) as img:
                    img.thumbnail((1280, 720))
                    queue.put((img.copy(), filename))  # Send a copy to the queue
            except Exception as e:
                print(f"Error processing {filename}: {e}")

    # Signal consumer that production is done
    queue.put(None)

def consumer(queue: Queue, output_dir: str, counter):
    """
    Reads images from the queue and saves them to output_dir.
    """
    while True:
        item = queue.get()
        if item is None:
            break  # Exit if producer signals completion

        img, filename = item
        name, _ = os.path.splitext(filename)
        output_path = os.path.join(output_dir, f"{name}-thumbnail.jpg")

        try:
            img.save(output_path)
            counter.append(1)  # Track successful saves
        except Exception as e:
            print(f"Error saving {filename}: {e}")
