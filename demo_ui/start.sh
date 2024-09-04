docker run --rm -p 8500:8500 \
    -v ${pwd}:/app \
    -e MOBIUS_LOGO_URL=/app/
    mobius-streamlit