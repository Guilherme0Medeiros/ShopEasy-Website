import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, ShoppingCart } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { ProductCard } from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import BannerCarousel from "../components/BannerCarousel";
import CartSidebar from "../components/CartSidebar";
import api from "../services/api";
import { Link } from "react-router-dom";

interface Produto {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  imagem: string;
  quantidade: number;
}

export default function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [cartItems, setCartItems] = useState<Produto[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    api
      .get("/produtos/")
      .then((res) => {
        setProdutos(
          res.data.results.map((p: any) => ({
            ...p,
            preco: Number(p.preco),
            quantidade: 1,
          }))
        );
      })
      .catch(console.error);
  }, []);

  const handleAddToCart = async (id: number) => {
    const produto = produtos.find((p) => p.id === id);
    if (!produto) return;

    try {
      await api.post("/carrinhos/adicionar-item/", {
        produto: id,
        quantidade: 1,
      });

      setCartItems((prev) => {
        const existingItem = prev.find((item) => item.id === id);
        if (existingItem) {
          return prev.map((item) =>
            item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
          );
        } else {
          return [...prev, { ...produto, quantidade: 1 }];
        }
      });
      setIsCartOpen(true);
    } catch (error) {
      console.error("Erro ao adicionar item no carrinho:", error);
    }
  };

  const handleRemoveItem = async (id: number) => {
    try {
      await api.delete("/carrinhos/remover-item/", {
        data: {
          produto: id,
          quantidade: 1,
        },
      });

      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Erro ao remover item do carrinho:", error);
    }
  };

  const handleRemoveAllItem = async (id: number) => {
    try {
      const item = cartItems.find((item) => item.id === id);
      if (!item) return;

      await api.delete("/carrinhos/remover-item/", {
        data: { produto: id, quantidade: item.quantidade },
      });

      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Erro ao remover todo o item do carrinho:", error);
    }
  };

  const increaseQuantity = async (id: number) => {
    try {
      await api.post("/carrinhos/adicionar-item/", {
        produto: id,
        quantidade: 1,
      });

      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
        )
      );
    } catch (error) {
      console.error("Erro ao aumentar quantidade:", error);
    }
  };

  const decreaseQuantity = async (id: number) => {
    try {
      await api.delete("/carrinhos/remover-item/", {
        data: {
          produto: id,
          quantidade: 1,
        },
      });

      setCartItems((prev) =>
        prev
          .map((item) =>
            item.id === id && item.quantidade > 1
              ? { ...item, quantidade: item.quantidade - 1 }
              : item
          )
          .filter((item) => item.quantidade > 0)
      );
    } catch (error) {
      console.error("Erro ao diminuir quantidade:", error);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout", { state: { cartItems } });
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 relative">
      {/* Topo escuro */}
      <div className="bg-black text-white">
        {/* Top bar */}
        <div className="text-sm py-2 border-b border-gray-800 flex justify-between px-6 items-center">
          <div className="text-orange-500 font-bold text-xl">Shop Easy</div>
          <p className="text-orange-400">🚚 FRETE GRÁTIS em todo Brasil*</p>
          <div className="flex gap-4 text-sm items-center">
            <a href="#" className="hover:underline">
              Fale Conosco
            </a>
            <a href="#" className="hover:underline">
              Meus Pedidos
            </a>
            <User size={20} />

            {/* Botão LOGIN ou LOGOUT */}
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="text-white hover:text-red-400 font-semibold"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="text-white hover:text-green-400 font-semibold"
              >
                Login
              </button>
            )}

            <button onClick={() => setIsCartOpen(true)} className="relative">
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                  {cartItems.reduce((acc, item) => acc + item.quantidade, 0)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Pesquisar */}
        <div className="py-4 px-6 flex justify-center">
          <SearchBar />
        </div>

        {/* Menu de categorias */}
        <nav className="px-6 py-4 flex gap-6 justify-center text-sm uppercase font-semibold tracking-wide border-b border-gray-800">
          <Link to="/camisetas" className="block">
            Camisetas
          </Link>
          <Link to="/games" className="block">
            Games
          </Link>
        </nav>
      </div>

      {/* Carrossel */}
      <BannerCarousel />

      {/* Produtos */}
      <section className="p-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">Produtos em Destaque</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {produtos.map((produto) => (
            <ProductCard
              key={produto.id}
              id={produto.id}
              nome={produto.nome}
              preco={produto.preco}
              descricao={produto.descricao}
              imagem={produto.imagem}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </section>

      {/* Sidebar do carrinho */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveAllItem}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onCheckout={handleCheckout}
      />
    </main>
  );
}
