import uvicorn
from core.apis.api import app

if __name__ == "__main__":
    uvicorn.run(
        app, host="0.0.0.0", port=8000, ws_ping_interval=300, ws_ping_timeout=300
    )
