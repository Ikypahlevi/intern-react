const fs = require('fs');

let content = fs.readFileSync('src/Pages/admin/orders/OrdersList.jsx', 'utf8');

if (!content.includes('import OrderDrawer')) {
  content = content.replace(
    'import OrdersBottomWidgets from "./_components/OrdersBottomWidgets";',
    'import OrdersBottomWidgets from "./_components/OrdersBottomWidgets";\nimport OrderDrawer from "./_components/OrderDrawer";'
  );
}

if (!content.includes('const [selectedOrder, setSelectedOrder] = useState(null);')) {
  content = content.replace(
    'const [highlightId, setHighlightId] = useState(null);',
    'const [highlightId, setHighlightId] = useState(null);\n  const [selectedOrder, setSelectedOrder] = useState(null);'
  );
}

if (!content.includes('onViewDetails={setSelectedOrder}')) {
  content = content.replace(
    '<OrdersTable',
    '<OrdersTable \n        onViewDetails={setSelectedOrder}'
  );
  
  // also need to replace the onUpdateStatus={handleUpdateStatus} in OrdersTable 
  // Wait, I actually removed onUpdateStatus from OrdersTable!
  content = content.replace(/onUpdateStatus=\{handleUpdateStatus\}/g, '');
}

if (!content.includes('<OrderDrawer')) {
  const displayOrderCode = '\n      <OrderDrawer\n        isOpen={!!selectedOrder}\n        onClose={() => setSelectedOrder(null)}\n        order={selectedOrder ? orders.find(o => o.id === selectedOrder.id) : null}\n        onUpdateStatus={handleUpdateStatus}\n      />\n';
  content = content.replace('      <OrdersBottomWidgets />', '      <OrdersBottomWidgets />' + displayOrderCode);
}

fs.writeFileSync('src/Pages/admin/orders/OrdersList.jsx', content);
