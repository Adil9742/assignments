from multiprocessing import Process, Queue, Manager
from producer_consumer import producer, consumer
import os

def main():
    base_dir = os.getcwd()
    input_dir = os.path.join(base_dir, "producer")
    output_dir = os.path.join(base_dir, "consumer")

   # Ensure the output directory exists
    os.makedirs(output_dir, exist_ok=True)

    # Queue for communication between producer and consumer
    queue = Queue()

    # Manager list to count successfully processed images
    manager = Manager()
    counter = manager.list()

    # Create producer and consumer processes
    producer_process = Process(target=producer, args=(queue, input_dir))
    consumer_process = Process(target=consumer, args=(queue, output_dir, counter))

    # Start the processes
    producer_process.start()
    consumer_process.start()

    # Wait for both processes to finish
    producer_process.join()
    consumer_process.join()

    print(f"Total images converted successfully: {len(counter)}")

if __name__ == "__main__":
    main()
