from django.urls import path
from core.views import order_views as views

urlpatterns = [
    path('add/', views.addOrderItems, name='orders-add'),
    path('<str:pk>/', views.getOrderById, name='user-orders'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='pay'),
]