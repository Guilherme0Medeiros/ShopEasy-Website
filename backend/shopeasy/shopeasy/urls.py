from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from shop.api.v1.router import router
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView
from django.conf import settings
from django.conf.urls.static import static
from shop.api.v1.viewsets import RegisterView , MeView , ChangePasswordView

# Configuração do Swagger
schema_view = get_schema_view(
    openapi.Info(
        title="ShopEasy API",
        default_version="v1",
        description="API para gerenciar produtos, carrinho e pedidos em um e-commerce.",
        terms_of_service="https://www.seusite.com/termos/",
        contact=openapi.Contact(email="contato@seusite.com"),
        license=openapi.License(name="Licença BSD"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls)),  
    path('api/v1/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    path('api/v1/register/', RegisterView.as_view(), name='register'),
    path('api/v1/me/', MeView.as_view(), name='me'),
    path('api/v1/change-password/', ChangePasswordView.as_view(), name='change-password'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)