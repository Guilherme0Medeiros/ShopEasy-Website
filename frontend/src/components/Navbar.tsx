import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">ShopEasy</Link>
      <div className="space-x-6">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/carrinho" className="hover:underline">Carrinho</Link>
        <Link to="/checkout" className="hover:underline">Checkout</Link>
      </div>
    </nav>
  );
}
