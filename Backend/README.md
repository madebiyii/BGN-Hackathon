# SpotChaseApp Backend

SpotChaseApp is a FastAPI-based backend application designed for high-performance web APIs. This guide provides instructions to set up the project and a summary of available API endpoints.

## Table of Contents

- [Project Setup](#project-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Additional Resources](#additional-resources)

## Project Setup

Follow these steps to set up SpotChaseApp on your local machine:

---

### 1. Clone the Repository

You can clone the repository using either HTTPS or SSH:

- **Option 1: Clone with HTTPS**:

  ```bash
  git clone https://github.com/Teniola-Malomo/BNG-Hackathon.git
  ```

- **Option 2: Clone with SSH**:

  ```bash
  git clone git@github.com:Teniola-Malomo/BNG-Hackathon.git
  ```

After cloning, navigate to the project directory:

```bash
cd BNG-Hackathon/Backend/
```

### 2. Create and Activate a Virtual Environment

For Python projects, it's recommended to use a virtual environment to isolate dependencies. Here's how to set it up:

- **Create a virtual environment**:

  ```bash
  python -m venv enviroment_name
  ```

- **Activate the virtual environment**:

  - On **Windows**:
    ```bash
    fastapi_env\Scripts\activate
    ```
  - On **macOS/Linux**:
    ```bash
    source fastapi_env/bin/activate
    ```

### 3. Install Dependencies

Once the virtual environment is activated, install the required Python packages:

```bash
pip install -r requirements.txt
```


## Running the Application

To run SpotChaseApp, use the following command:

```bash
uvicorn SpotChaseApp:SpotChaseApp --reload
```

- **SpotChaseApp**: This is the name of the Python file (`SpotChaseApp.py`).
- **SpotChaseApp**: This is the FastAPI app instance in the file.

The app will be available at [http://127.0.0.1:8000](http://127.0.0.1:8000).

### Interactive API Documentation

FastAPI automatically generates interactive documentation. You can access it at the following URLs:
- **Swagger UI**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **ReDoc**: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)


## Additional Resources

For more information about FastAPI and related libraries, visit:
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Uvicorn Documentation](https://www.uvicorn.org/)

---