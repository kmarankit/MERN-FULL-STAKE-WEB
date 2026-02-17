// Admin Dashboard Styles and Constants
import { FiCheckCircle, FiClock, FiTruck, FiPackage } from 'react-icons/fi';
import { MdError } from 'react-icons/md';

// ================= NAVBAR STYLES =================
export const styles = {
  navContainer: 'flex items-center justify-between px-6 py-4 max-w-7xl mx-auto',
  logoSection: 'flex items-center gap-3',
  menuButton: 'md:hidden text-white text-2xl cursor-pointer',
  desktopMenu: 'hidden md:flex items-center gap-8',
  mobileMenu: 'md:hidden flex flex-col gap-4 px-6 py-4 bg-gray-700',
  navLinkBase: 'flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300',
  navLinkActive: 'bg-amber-500 text-white font-semibold',
  navLinkInactive: 'text-gray-200 hover:text-white hover:bg-gray-700',
};

// ================= NAVBAR LINKS =================
export const navLinks = [
  { name: 'Dashboard', href: '/', icon: '📊' },
  { name: 'Orders', href: '/orders', icon: '📦' },
  { name: 'Add Items', href: '/additems', icon: '➕' },
  { name: 'List Items', href: '/list', icon: '📋' },
];

// ================= ORDER STATUS STYLES =================
export const statusStyles = {
  processing: {
    label: 'Processing',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    icon: 'clock',
  },
  'Food Preparing': {
    label: 'Food Preparing',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    icon: 'clock',
  },
  outForDelivery: {
    label: 'Out For Delivery',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    icon: 'truck',
  },
  delivered: {
    label: 'Delivered',
    color: 'text-green-600',
    bg: 'bg-green-50',
    icon: 'check',
  },
  succeeded: {
    label: 'Succeeded',
    color: 'text-green-600',
    bg: 'bg-green-50',
    icon: 'check',
  },
};

// ================= PAYMENT METHOD DETAILS =================
export const paymentMethodDetails = {
  cod: {
    label: 'Cash on Delivery',
    class: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  },
  online: {
    label: 'Online Payment',
    class: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  card: {
    label: 'Card Payment',
    class: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  upi: {
    label: 'UPI Payment',
    class: 'bg-green-50 text-green-700 border-green-200',
  },
  default: {
    label: 'Payment',
    class: 'bg-gray-50 text-gray-700 border-gray-200',
  },
};

// ================= ICON MAP =================
export const iconMap = {
  check: <FiCheckCircle className="text-green-600" />,
  clock: <FiClock className="text-blue-600" />,
  truck: <FiTruck className="text-purple-600" />,
  package: <FiPackage className="text-gray-600" />,
  error: <MdError className="text-red-600" />,
};

// ================= TABLE CLASSES =================
export const tableClasses = {
  container: 'overflow-x-auto rounded-lg border border-gray-200',
  table: 'w-full border-collapse',
  headerRow: 'bg-gray-100 text-gray-600 text-sm uppercase tracking-wide',
  headerCell: 'py-3 px-4 text-left font-semibold',
  bodyRow: 'transition hover:bg-gray-50',
  bodyCell: 'py-3 px-4',
};

// ================= LAYOUT CLASSES =================
export const layoutClasses = {
  page: 'min-h-screen bg-gray-50 py-10 px-4',
  container: 'max-w-7xl mx-auto',
  card: 'bg-white rounded-2xl shadow-xl p-6',
  title: 'text-2xl font-bold text-gray-700 mb-6 border-b pb-3',
};
