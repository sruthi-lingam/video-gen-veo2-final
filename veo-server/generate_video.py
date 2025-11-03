import os
import sys
import time
from google import genai
from google.genai.types import GenerateVideosConfig
from vertexai.preview.generative_models import GenerativeModel

#Setup environment variables
os.environ['GOOGLE_CLOUD_PROJECT'] = 'veo-test-462014'
os.environ['GOOGLE_CLOUD_LOCATION'] = 'us-central1'

project = "veo-test-462014"
location = "us-central1"
output_gcs_uri = "gs://veo-videos-sruthi-2025/videos/"
model = "veo-2.0-generate-001"
client = genai.Client(vertexai=True, project=project, location=location)

def generate_video_advanced(prompt):
    config = GenerateVideosConfig(
        aspect_ratio="16:9",
        output_gcs_uri=output_gcs_uri,
        number_of_videos=1,
        duration_seconds=8,
        person_generation="allow_adult"
    )

    try:
        operation = client.models.generate_videos(
            model=model,
            prompt=prompt,
            config=config
        )
        while not operation.done:
            print("Waiting for video generation...", file=sys.stderr)
            time.sleep(15)
            operation = client.operations.get(operation)
        if operation.response:
            video_uri = operation.result.generated_videos[0].video.uri
            print(video_uri, flush=True)  #stdout contains only gs:// URL
        else:
            print("Failed to generate video", file=sys.stderr)
            if hasattr(operation, "error"):
                print(operation.error, file=sys.stderr)
            print("")  #empty stdout to indicate failure
    except Exception as e:
        print(f"Error: {str(e)}", file=sys.stderr)
        print("")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("No prompt provided", file=sys.stderr)
        print("")
    else:
        prompt_text = sys.argv[1]
        generate_video_advanced(prompt_text)
