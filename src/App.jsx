import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import EntityManagerPage from "./pages/admin/EntityManagerPage";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <LanguageProvider>
          <Layout>
            <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute>
                  <EntityManagerPage
                    title="Gestion Produits"
                    table="products"
                    fields={[
                      { key: "name", label: "Nom produit" },
                      { key: "price", label: "Prix" },
                      { key: "stock", label: "Stock" },
                    ]}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/categories"
              element={
                <ProtectedRoute>
                  <EntityManagerPage title="Gestion Categories" table="categories" fields={[{ key: "name", label: "Nom categorie" }]} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute>
                  <EntityManagerPage title="Gestion Commandes" table="orders" fields={[{ key: "status", label: "Statut" }]} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/blog"
              element={
                <ProtectedRoute>
                  <EntityManagerPage
                    title="Gestion Blog"
                    table="blog_posts"
                    fields={[
                      { key: "title", label: "Titre" },
                      { key: "content", label: "Contenu" },
                    ]}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/gallery"
              element={
                <ProtectedRoute>
                  <EntityManagerPage title="Gestion Galerie" table="gallery" fields={[{ key: "title", label: "Titre image" }, { key: "image_url", label: "URL image" }]} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute>
                  <EntityManagerPage title="Parametres Site" table="settings" fields={[{ key: "key", label: "Cle" }, { key: "value", label: "Valeur" }]} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <EntityManagerPage title="Gestion Utilisateurs" table="admin_users" fields={[{ key: "email", label: "Email admin" }, { key: "role", label: "Role" }]} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/notifications"
              element={
                <ProtectedRoute>
                  <EntityManagerPage title="Notifications" table="notifications" fields={[{ key: "title", label: "Titre" }, { key: "message", label: "Message" }]} />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </LanguageProvider>
      </CartProvider>
    </AuthProvider>
  );
}
