from fastapi import FastAPI, HTTPException
import httpx

app = FastAPI()
WINDOW_SIZE = 10
number_store = []  # Rolling window of unique numbers

async def fetch_numbers(number_id):
    """Fetch numbers from the third-party API."""
    api_url = f"https://test-server.com/numbers/{number_id}"  # Replace with actual API URL
    try:
        async with httpx.AsyncClient(timeout=0.5) as client:
            response = await client.get(api_url)
            if response.status_code == 200:
                return response.json().get("numbers", [])
    except httpx.RequestError:
        pass
    return []  # Return empty list if request fails

@app.get("/numbers/{number_id}")  # 👈 **This is the route definition**
async def get_numbers(number_id: str):
    """Handles API request, updates rolling window, and returns response."""
    if number_id not in {"p", "f", "e", "r"}:
        raise HTTPException(status_code=400, detail="Invalid number ID")

    new_numbers = await fetch_numbers(number_id)
    unique_new_numbers = [num for num in new_numbers if num not in number_store]

    prev_state = number_store.copy()
    number_store.extend(unique_new_numbers)
    if len(number_store) > WINDOW_SIZE:
        number_store[: len(number_store) - WINDOW_SIZE] = []  # Trim oldest numbers

    avg = round(sum(number_store) / len(number_store), 2) if number_store else 0.0

    return {
        "windowPrevState": prev_state,
        "windowCurrState": number_store,
        "numbers": new_numbers,
        "avg": avg,
    }
