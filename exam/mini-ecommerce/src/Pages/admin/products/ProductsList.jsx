import React, { useState, useMemo } from "react";
import { useGetProducts } from "../../../Services/queries/useProducts";
import AdminPageHeader from "../../../Components/admin/AdminPageHeader";
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

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (columnFilters.sku && !p.sku.toLowerCase().includes(columnFilters.sku.toLowerCase())) return false;
      if (columnFilters.name && !p.name.toLowerCase().includes(columnFilters.name.toLowerCase())) return false;
      if (columnFilters.genre && p.category !== columnFilters.genre) return false;
      if (columnFilters.publisher && p.publisher !== columnFilters.publisher) return false;
      
      const price = p.price || 0;
      if (columnFilters.priceMin && price < Number(columnFilters.priceMin)) return false;
      if (columnFilters.priceMax && price > Number(columnFilters.priceMax)) return false;

      if (columnFilters.stock) {
        const stock = p.stock || 0;
        if (columnFilters.stock === 'instock' && stock < 50) return false;
        if (columnFilters.stock === 'lowstock' && (stock >= 50 || stock === 0)) return false;
        if (columnFilters.stock === 'outstock' && stock !== 0) return false;
      }

      if (columnFilters.status && p.status !== columnFilters.status) return false;

      return true;
    });
  }, [products, columnFilters]);

  // KPI Calculations
  const kpiBlocks = useMemo(() => {
    const total = products.length;
    const active = products.filter(p => p.status === 'active' || p.stock > 0).length;
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
          products={filteredProducts}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          onEditProduct={handleOpenDrawer}
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
