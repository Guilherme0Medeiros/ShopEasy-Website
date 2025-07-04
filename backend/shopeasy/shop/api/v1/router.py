from rest_framework.routers import DefaultRouter
from .viewsets import ProdutoViewSet, CarrinhoViewSet, ItemCarrinhoViewSet, PedidoViewSet , UserViewSet

router = DefaultRouter()
router.register(r'produtos', ProdutoViewSet)
router.register(r'carrinhos', CarrinhoViewSet, basename='carrinho')
router.register(r'itens-carrinho', ItemCarrinhoViewSet)
router.register(r'pedidos', PedidoViewSet)
router.register(r'usuarios', UserViewSet, basename='usuarios')

