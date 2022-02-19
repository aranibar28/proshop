# E-commerce utilizando Django con React

Sitio web de comercio electrónico integrando Django con React, construido de forma lineal y progresiva mediante la utilización de Django REST framework para crear una Web API.

Funcionalidades:

- Carrito de la compra completo con PayPal y pagos de crédito/débito.
- Sistema de calificación y revisión de productos.
- Búsqueda de productos, filtros, carrusel y paginación.
- Autenticación y autorización de usuarios con JSON Web Token.
- Mantenimiento de clientes, productos y pedidos.

## Backend

    cd backend
    python -m venv env
    source env/Scripts/active
    pip install -r requirements.txt
    py manage.py runserver

## Frontend

    cd frontend
    yarn install
    yarn start
