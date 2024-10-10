from core.utils.external_call import APIInterface
import os


class SarvamAPI:
    def __init__(self) -> None:
        self.api_key = os.environ.get("SARVAM_API_KEY")
        self.sarvam_base_url = "https://api.sarvam.ai"
        self.speaker_map = {"raju": "arvind", "rani": "pavithra"}
        self.local_testing = os.environ.get("LOCAL_TESTING")

    def sarvam_tts(
        self, text: str, target_language_code: str = "hi-IN", speaker: str = "raju"
    ):
        if self.local_testing == "True":
            print(f"Bypassing audio generation")
            return None
        route = f"{self.sarvam_base_url}/text-to-speech"
        text = text.replace("*", "")
        payload = {
            "inputs": [text],
            "target_language_code": target_language_code,
            "speaker": self.speaker_map[speaker],
            "pitch": 0,
            "pace": 1.2,
            "loudness": 1.5,
            "speech_sample_rate": 8000,
            "enable_preprocessing": True,
            "model": "bulbul:v1",
        }
        headers = {
            "api-subscription-key": self.api_key,
            "Content-Type": "application/json",
        }

        response, response_code = APIInterface.post_without_logs(
            route=route, json=payload, headers=headers
        )
        return response.get("audios")[0]
