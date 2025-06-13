interface ProductCardProps {
  id: number;
  nome: string;
  preco: number;
  descricao?: string;
  onAddToCart: (id: number) => void;
  imagem?: string; // novo campo opcional para imagem
}

export function ProductCard({ id, nome, preco, descricao, onAddToCart, imagem }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 p-4 max-w-xs">
      <div className="aspect-[3/3.8] mb-4">
        {imagem ? (
          <img
            src={imagem}
            alt={nome}
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 rounded-md">
            <span>Imagem</span>
          </div>
        )}
      </div>

      <h3 className="text-base font-semibold text-gray-800">{nome}</h3>

      {descricao && (
        <p className="text-sm text-gray-500 mt-1 mb-2">
          {descricao.substring(0, 60)}...
        </p>
      )}

      <div className="mb-2">
        <span className="text-lg font-bold text-orange-600">
          R$ {preco.toFixed(2)}
        </span>
        <p className="text-sm text-gray-500">6x de R$ {(preco / 6).toFixed(2)} sem juros</p>
        <p className="text-sm text-orange-500 font-semibold">3% OFF à vista no Pix</p>
      </div>

      <button
        onClick={() => onAddToCart(id)}
        className="w-full mt-2 bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
      >
        Adicionar ao carrinho
      </button>
    </div>
  );
}
