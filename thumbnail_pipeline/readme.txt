
------------- Project Structure ----------------

main.py                 # Runs the pipeline
producer_consumer.py    # Producer & consumer functions
producer/               # Input images
consumer/               # Output thumbnails

------------- Workflow --------------------------

Producer: Reads images from producer/, creates thumbnails, puts them in a queue.

Consumer: Reads from queue, saves thumbnails in consumer/, counts successful conversions.

Main: Starts producer & consumer, waits for completion, prints total converted images.

------------- How to Run ----------------------

1. Place images in producer/.

2. Run: python main.py


Thumbnails appear in consumer/ folder.

Console shows the total images processed.

-------- Notes --------------

Requires Pillow:  pip install Pillow