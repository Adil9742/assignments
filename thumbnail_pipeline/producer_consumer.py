from multiprocessing import Queue
from PIL import Image
import os

def producer(queue: Queue, input_dir: str):
    """
    Reading images from input_dir, and creating thumbnails, and pushing them into the queue.
    """
    for filename in os.listdir(input_dir):
        if filename.lower().endswith((".jpg", ".jpeg", ".png")):
            img_path = os.path.join(input_dir, filename)
            try:
                with Image.open(img_path) as img:
                    img.thumbnail((1280, 720))
                    queue.put((img.copy(), filename)) 
            except Exception as e:
                print(f"Error processing {filename}: {e}")

   
    queue.put(None)

def consumer(queue: Queue, output_dir: str, counter):
    """
    Reading images from the queue and saveing them to output_dir.
    """
    while True:
        item = queue.get()
        if item is None:
            break 
        
        img, filename = item
        name, _ = os.path.splitext(filename)
        output_path = os.path.join(output_dir, f"{name}-thumbnail.jpg")

        try:
            img.save(output_path)
            counter.append(1)  
        except Exception as e:
            print(f"Error saving {filename}: {e}")
