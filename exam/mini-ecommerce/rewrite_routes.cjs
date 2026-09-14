const fs = require('fs');
let r = fs.readFileSync('src/Routes/index.jsx', 'utf8');

r = r.replace(/import (\w+) from '(\.\.\/Pages\/.*?)';/g, 'const  = lazy(() => import(''));');
r = r.replace(/import (\w+) from "(\.\.\/Pages\/.*?)";/g, 'const  = lazy(() => import(""));');

if (!r.includes('import React, { lazy, Suspense }')) {
  r = 'import React, { lazy, Suspense } from "react";\nimport ErrorBoundary from "../Components/common/ErrorBoundary";\n' + r;
}

r = r.replace(/import ProductsListAdmin from "(\.\.\/Pages\/admin\/products\/ProductsList)";/, 'const ProductsListAdmin = lazy(() => import(""));');
r = r.replace(/import OrdersListAdmin from "(\.\.\/Pages\/admin\/orders\/OrdersList)";/, 'const OrdersListAdmin = lazy(() => import(""));');
r = r.replace(/import SettingsAdmin from "(\.\.\/Pages\/admin\/settings\/Settings)";/, 'const SettingsAdmin = lazy(() => import(""));');

// We need to wrap elements in Suspense and add errorElement
r = r.replace(/element: <(\w+) \/>/g, 'errorElement: <ErrorBoundary />,\n    element: <Suspense fallback={<div className="flex justify-center items-center h-screen"><div className="animate-spin w-8 h-8 border-4 border-black border-t-transparent rounded-full"></div></div>}>< /></Suspense>');
r = r.replace(/element: <ProtectedRoute>\s*<(\w+) \/>\s*<\/ProtectedRoute>/g, 'errorElement: <ErrorBoundary />,\n    element: <ProtectedRoute><Suspense fallback={<div className="flex justify-center items-center h-screen"><div className="animate-spin w-8 h-8 border-4 border-black border-t-transparent rounded-full"></div></div>}>< /></Suspense></ProtectedRoute>');
r = r.replace(/element: <GuestRoute>\s*<(\w+) \/>\s*<\/GuestRoute>/g, 'errorElement: <ErrorBoundary />,\n    element: <GuestRoute><Suspense fallback={<div className="flex justify-center items-center h-screen"><div className="animate-spin w-8 h-8 border-4 border-black border-t-transparent rounded-full"></div></div>}>< /></Suspense></GuestRoute>');

fs.writeFileSync('src/Routes/index.jsx', r);
