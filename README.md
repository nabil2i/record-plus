
# Record Plus
This project is mainly a backend REST API for recording and saving the computer screen. The frontend is a React app that only implements a JSON Web token authentication system using the django backend.

## Installation
* Clone the repository
```bash
git clone https://github.com/nabil2i/record.git
```

* In the recordplusfrontend folder, install the frontend packages:

```bash
npm install
```

* In the recordplusfrontend and recordplusbackend folders, create a `.env` file and supply the values for the environment variables based on the `example.env` files
<!-- * In the recordplusfrontend folder, build the project and copy it into the recordplusbackend folder
```bash
npm run build
``` -->

* In the recordplusbackend folder, create a virtual environment, activate it, and install the requirements 
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

* In the recordplusfrontend folder, launch the server and access it on `http://127.0.0.1:8000`
```bash
npm run dev 
```

* In the recordplusbackend folder, make migrations, run the migrations and launch the server and access it on `http://127.0.0.1:5173`
```bash
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver
```
