import React, { useState, useMemo } from "react";
import { useGetProducts } from "../../../Services/queries/useProducts";
import { STATUS } from "../../../Constants";
import { useDebounce } from "../../../Utils/useDebounce";
import AdminPageHeader from "../../../Components/admin/AdminPageHeader";
import AdminPagination from "../../../Components/admin/AdminPagination";
import ProductsActionBar from "./_components/ProductsActionBar";
import ProductsTable from "./_components/ProductsTable";
import ProductDrawer from "./_components/ProductDrawer";

export default function ProductsList() {
  const { data: products = [], isLoading } = useGetProducts();

  const [columnFilters, setColumnFilters] = useState({
    sku: "",
    name: "",
    genre: "",
    publisher: "",
    priceMin: "",
    priceMax: "",
    stock: "",
    status: "",
  });
  
  const debouncedFilters = useDebounce(columnFilters, 500);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (debouncedFilters.sku && !p.sku.toLowerCase().includes(debouncedFilters.sku.toLowerCase())) return false;
      if (debouncedFilters.name && !p.name.toLowerCase().includes(debouncedFilters.name.toLowerCase())) return false;
      if (debouncedFilters.genre && p.category !== debouncedFilters.genre) return false;
      if (debouncedFilters.publisher && p.publisher !== debouncedFilters.publisher) return false;
      
      const price = p.price || 0;
      if (debouncedFilters.priceMin && price < Number(debouncedFilters.priceMin)) return false;
      if (debouncedFilters.priceMax && price > Number(debouncedFilters.priceMax)) return false;

      if (debouncedFilters.stock) {
        const stock = p.stock || 0;
        if (debouncedFilters.stock === 'instock' && stock < 50) return false;
        if (debouncedFilters.stock === 'lowstock' && (stock >= 50 || stock === 0)) return false;
        if (debouncedFilters.stock === 'outstock' && stock !== 0) return false;
      }

      if (debouncedFilters.status && p.status !== debouncedFilters.status) return false;

      return true;
    });
  }, [products, debouncedFilters]);

  // KPI Calculations
  const kpiBlocks = useMemo(() => {
    const total = products.length;
    const active = products.filter(p => p.status === STATUS.ACTIVE || p.stock > 0).length;
    const outOfStock = products.filter(p => p.stock === 0).length;

    return [
      {
        label: "TỔNG SỐ LƯỢNG",
        value: total,
        trend: "up",
        trendLabel: "100% kho hoạt động",
        trendColor: "text-blue-600",
        bgColor: "bg-gray-100",
        labelColor: "text-gray-600"
      },
      {
        label: "ĐANG KINH DOANH",
        value: active,
        trend: "up",
        trendLabel: "96.8% khả dụng",
        trendColor: "text-green-700",
        bgColor: "bg-green-100",
        labelColor: "text-green-800",
        valueColor: "text-green-700"
      },
      {
        label: "TẠM HẾT HÀNG",
        value: outOfStock,
        trend: "down",
        trendLabel: "Tồn = 0",
        trendColor: "text-red-700",
        bgColor: "bg-red-100",
        labelColor: "text-red-800",
        valueColor: "text-red-600"
      }
    ];
  }, [products]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  React.useEffect(() => {
    setCurrentPage(1);
  }, [debouncedFilters]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleResetFilters = () => {
    setColumnFilters({
      sku: "", name: "", genre: "", publisher: "", priceMin: "", priceMax: "", stock: "", status: ""
    });
  };

  const handleOpenDrawer = (product = null) => {
    setEditingProduct(product);
    setIsDrawerOpen(true);
  };

  if (isLoading) {
    return <div className="font-comic text-2xl animate-pulse p-10">ĐANG TẢI DỮ LIỆU KHO...</div>;
  }

  return (
    <div className="flex flex-col w-full pb-12 gap-8 max-w-[1400px] mx-auto font-bubble">
      <AdminPageHeader 
        title="QUẢN LÝ KHO TRUYỆN TRANH & SẢN PHẨM"
        description={`Quản lý tập trung ${products.length} đầu truyện manga, light novel, boxset sưu tầm giới hạn.`}
        iconClass="fa-book"
        versionTag="INVENTORY CONTROL v2.4"
        kpiBlocks={kpiBlocks}
      />
      
      <div className="flex flex-col gap-4">
        <ProductsActionBar 
          onOpenAdd={() => handleOpenDrawer(null)}
          onResetFilters={handleResetFilters}
        />
        
        <ProductsTable 
          products={currentProducts}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          onEditProduct={handleOpenDrawer}
        />
        
        <AdminPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredProducts.length}
          itemsPerPage={itemsPerPage}
        />
      </div>

      <ProductDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        product={editingProduct}
      />
    </div>
  );
}
