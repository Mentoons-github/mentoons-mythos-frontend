import { Eye, PenSquare, Trash2 } from "lucide-react";
import { SearchOptions, ShowSort, SortButton } from "../components/SortDetails";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  deleteProductsThunk,
  fetchProductsThunk,
} from "../../features/products/productThunk";
import { Product2 } from "../../types/products";
import ViewProductModal from "../components/modals/Products/ViewProductModal";
import AddProductModal from "../components/modals/Products/AddProductModal";
import DeleteModal from "../components/modals/deleteModal";
import { resetProductSlice } from "../../features/products/productSlice";

const AdminProducts = () => {
  const [showTable, setShowTable] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showSort, setShowSort] = useState(false);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [search, setSearch] = useState("");
  const [viewProductModalOpen, setViewProductModalOpen] =
    useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product2 | null>(null);
  const [addProductModalOpen, setAddProductModalOpen] =
    useState<boolean>(false);
  const [editProductModalOpen, setEditProductModalOpen] =
    useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const {
    products,
    loading,
    message,
    deleteError,
    deleteLoading,
    deleteSuccess,
  } = useAppSelector((state) => state.product);

  useEffect(() => {
    if (deleteSuccess) {
      toast.success(message);
      dispatch(resetProductSlice());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(resetProductSlice());
    }
  }, [message, deleteSuccess, dispatch, deleteError]);

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [currentPage, dispatch, search, sortOrder]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTable(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleViewProduct = (product: Product2) => {
    if (!product) return;
    setSelectedProduct(product);
    setViewProductModalOpen(true);
  };

  const handleEditProduct = (product: Product2) => {
    if (!product) return;
    setSelectedProduct(product);
    setEditProductModalOpen(true);
  };

  const handleDelete = (product: Product2) => {
    setDeleteModalOpen(true);
    setSelectedProduct(product);
  };

  return (
    <div className="pt-3 lg:p-4">
      <div className="flex mb-4 h-11 items-center space-x-4 justify-between">
        <SortButton
          onClick={() => setShowSort((prev) => !prev)}
          showSort={showSort}
        />

        <div className="flex gap-3">
          <SearchOptions
            search={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          <div>
            <button
              onClick={() => setAddProductModalOpen(true)}
              className="px-4 flex py-2 bg-blue-800 hover:bg-blue-700 rounded-lg font-semibold transition text-white"
            >
              Add Product +
            </button>
          </div>
        </div>
      </div>
      {showSort && (
        <ShowSort
          sortOrder={sortOrder}
          onClick={(sort) => {
            setSortOrder(sort as "newest" | "oldest");
            setCurrentPage(1);
          }}
        />
      )}

      {!showTable || loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 ">Loading Job details...</span>
        </div>
      ) : products.length == 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center ">
          <div className="w-16 h-16 flex items-center justify-center rounded-full  mb-4">
            📭
          </div>
          <h2 className="text-xl font-semibold ">No Workshops</h2>
          <p className="text-muted-foreground mt-2">
            It looks like there are no workshops yet.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Image</th>
                  <th className="px-4 py-3 text-left">Product Title</th>
                  <th className="px-4 py-3 text-left">Product Price</th>
                  <th className="px-4 py-3 text-left">Offer Price</th>
                  <th className="px-4 py-3 text-left">Total Pages</th>
                  <th className="px-4 py-3 text-left">Page Size</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-10 text-center">
                      Loading products...
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-gray-500">
                      No quizzes found.
                    </td>
                  </tr>
                ) : (
                  products.map((product, index) => (
                    <tr
                      key={index}
                      className={`border-b ${
                        index % 2 == 0 ? "bg-muted" : ""
                      } border-gray-600`}
                    >
                      <td className="px-4 py-3">
                        <img
                          src={product.thumbnails?.[0]}
                          alt={product.title}
                          className="h-14 w-14 rounded-lg border object-cover"
                        />
                      </td>

                      <td className="px-4 py-3 font-medium">{product.title}</td>

                      <td className="px-4 py-3 ">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text- font-medium text-blue-700">
                          ₹{product.price}
                        </span>
                      </td>

                      <td className="px-4 py-3 ">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text- font-medium text-green-700">
                          ₹{product.offerPrice}
                        </span>
                      </td>

                      <td className="px-4 py-3 font-medium">{product.pages}</td>

                      <td className="px-4 py-3 font-medium">{product.size}</td>

                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-3 h-full">
                          <button
                            className=" font-semibold text-blue-800 rounded-md hover:text-blue-600"
                            onClick={() => handleViewProduct(product)}
                          >
                            <Eye size={20} />
                          </button>

                          <button
                            className=" font-semibold text-blue-800 rounded-md hover:text-blue-600"
                            onClick={() => handleEditProduct(product)}
                          >
                            <PenSquare size={20} />
                          </button>

                          <button
                            className=" font-semibold text-red-600 rounded-md hover:text-red-700"
                            onClick={() => handleDelete(product)}
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {viewProductModalOpen && (
        <ViewProductModal
          isOpen={viewProductModalOpen}
          onClose={() => setViewProductModalOpen(false)}
          product={selectedProduct}
        />
      )}

      {addProductModalOpen && (
        <AddProductModal
          isOpen={addProductModalOpen}
          onClose={() => setAddProductModalOpen(false)}
        />
      )}

      {editProductModalOpen && (
        <AddProductModal
          isOpen={editProductModalOpen}
          onClose={() => setEditProductModalOpen(false)}
          productForEdit={selectedProduct}
        />
      )}
      {deleteModalOpen && (
        <DeleteModal
          loading={deleteLoading}
          item="Product"
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={() => {
            if (selectedProduct) {
              dispatch(deleteProductsThunk(selectedProduct._id));
            }
            setDeleteModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default AdminProducts;
