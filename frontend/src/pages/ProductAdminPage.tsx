import { useEffect, useState } from "react";
import api from "../services/api";
import { ProductCard } from "../components/ProductCard";

interface Produto {
  id: number;
  nome: string;
  preco: number;
  descricao?: string;
  imagem?: string;
  estoque: number;
  quantidade: number;
}

export default function ProductAdminPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [form, setForm] = useState({
    id: 0,
    nome: "",
    preco: 0,
    descricao: "",
    imagem: "",            // URL da imagem
    imagemFile: null as File | null, // arquivo de imagem
    estoque: 0,
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = () => {
    api
      .get("/produtos/")
      .then((res) => {
        const data = res.data?.results ?? res.data;
        if (Array.isArray(data)) {
          setProdutos(
            data.map((p: any) => ({
              ...p,
              preco: Number(p.preco),
              quantidade: 1,
              estoque: p.estoque ?? 0,
            }))
          );
        } else {
          console.error("Formato inválido de resposta da API:", res.data);
        }
      })
      .catch((err) => console.error("Erro ao carregar produtos:", err));
  };

  const handleAddToCart = (id: number) => {
    console.log("Adicionar ao carrinho (apenas admin):", id);
  };

  // Atualiza o formulário ao digitar
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "preco" || name === "estoque" ? Number(value) : value,
    }));
  };

  // Submit do formulário para criar ou editar
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { id, nome, preco, descricao, imagem, imagemFile, estoque } = form;

    if (!nome || preco <= 0 || estoque < 0) {
      alert("Preencha nome, preço (> 0) e estoque (>= 0) corretamente!");
      return;
    }

    try {
      if (imagemFile) {
        // Envia multipart/form-data com arquivo
        const data = new FormData();
        data.append("nome", nome);
        data.append("preco", preco.toString());
        data.append("descricao", descricao);
        data.append("estoque", estoque.toString());
        data.append("imagem", imagemFile);

        if (isEditing) {
          await api.put(`/produtos/${id}/`, data, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        } else {
          await api.post("/produtos/", data, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        }
      } else {
        // Envia JSON normal com URL da imagem
        const payload = {
          nome,
          preco,
          descricao,
          estoque,
          imagem, // url
        };

        if (isEditing) {
          await api.put(`/produtos/${id}/`, payload);
        } else {
          await api.post("/produtos/", payload);
        }
      }

      alert(isEditing ? "Produto atualizado com sucesso!" : "Produto criado com sucesso!");
      setForm({
        id: 0,
        nome: "",
        preco: 0,
        descricao: "",
        imagem: "",
        imagemFile: null,
        estoque: 0,
      });
      setIsEditing(false);
      fetchProdutos();
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar produto.");
    }
  };

  // Carrega produto no formulário para editar
  const handleEdit = (id: number) => {
    const produto = produtos.find((p) => p.id === id);
    if (!produto) return alert("Produto não encontrado");

    setForm({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      descricao: produto.descricao ?? "",
      imagem: produto.imagem ?? "",
      imagemFile: null,
      estoque: produto.estoque ?? 0,
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Deletar produto
  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja deletar este produto?")) return;

    try {
      await api.delete(`/produtos/${id}/`);
      setProdutos((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Erro ao deletar produto:", err);
      alert("Erro ao deletar produto.");
    }
  };

  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Administração de Produtos</h1>

      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Editar Produto" : "Adicionar Produto"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="border p-2 rounded"
            placeholder="Nome"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
          <input
            className="border p-2 rounded"
            placeholder="Preço"
            type="number"
            min="0.01"
            step="0.01"
            name="preco"
            value={form.preco === 0 ? "" : form.preco}
            onChange={(e) => {
              const val = e.target.value;
              setForm((prev) => ({
                ...prev,
                preco: val === "" ? 0 : parseFloat(val),
              }));
            }}
          />
          <textarea
            className="border p-2 rounded col-span-2"
            placeholder="Descrição"
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
          />
          <input
            className="border p-2 rounded col-span-2"
            placeholder="URL da Imagem"
            name="imagem"
            value={form.imagem}
            onChange={handleChange}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null;
              setForm(prev => ({ ...prev, imagemFile: file }));
            }}
            className="border p-2 rounded col-span-2"
          />
          {form.imagemFile && (
            <img
              src={URL.createObjectURL(form.imagemFile)}
              alt="Preview da imagem"
              className="w-32 h-32 object-cover rounded mt-2 col-span-2"
            />
          )}
          <input
            className="border p-2 rounded col-span-2"
            placeholder="Estoque"
            type="number"
            min="0"
            step="1"
            name="estoque"
            value={form.estoque === 0 ? "" : form.estoque}
            onChange={(e) => {
              const val = e.target.value;
              setForm((prev) => ({
                ...prev,
                estoque: val === "" ? 0 : parseInt(val, 10),
              }));
            }}
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
        >
          {isEditing ? "Atualizar Produto" : "Salvar Produto"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setForm({
                id: 0,
                nome: "",
                preco: 0,
                descricao: "",
                imagem: "",
                imagemFile: null,
                estoque: 0,
              });
            }}
            className="mt-2 bg-gray-300 px-6 py-2 rounded hover:bg-gray-400"
          >
            Cancelar Edição
          </button>
        )}
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {produtos.map((produto) => (
          <div key={produto.id}>
            <ProductCard
              id={produto.id}
              nome={produto.nome}
              preco={produto.preco}
              descricao={produto.descricao}
              imagem={produto.imagem}
              onAddToCart={handleAddToCart}
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleEdit(produto.id)}
                className="w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(produto.id)}
                className="w-full bg-red-500 text-white py-1 rounded hover:bg-red-600"
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
