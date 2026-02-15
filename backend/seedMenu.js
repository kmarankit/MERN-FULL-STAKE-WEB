import mongoose from "mongoose";
import dotenv from "dotenv";
import Item from "./modals/item.js"; // adjust case if needed

// 🔥 Force dotenv to load correctly
dotenv.config({ path: "./.env" });

console.log("Loaded URI:", process.env.MONGO_URI); // debug

const seedDatabase = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in .env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");

    await Item.deleteMany();
    console.log("Old data cleared");


const menuItems = [

  // ===================== APPETIZERS =====================
  { name: "Salad", description: "Fresh desi salad with nimbu and masala touch.", category: "Indo-Chinese", price: 80, isVeg: true, imageUrl: "/uploads/1758459769027-salad.jpg" },
  { name: "Kachumber Salad", description: "Pyaz, tamatar, kheera ka desi mix salad.", category: "Indo-Chinese", price: 100, isVeg: true, imageUrl: "/uploads/1761891226144-Kachumar Salad.png" },
  { name: "Dry Papad", description: "Crispy roasted papad.", category: "Indo-Chinese", price: 20, isVeg: true, imageUrl: "/uploads/1758460365051-kachumber salaad.png" },
  { name: "Fried Papad", description: "Golden fried crunchy papad.", category: "Indo-Chinese", price: 30, isVeg: true, imageUrl: "/uploads/1758460365051-kachumber salaad.png" },
  { name: "Masala Papad", description: "Papad topped with masala and onion.", category: "Indo-Chinese", price: 40, isVeg: true, imageUrl: "/uploads/1758460365051-kachumber salaad.png" },
  { name: "Chana Chatpata", description: "Spicy chana with desi tadka.", category: "Indo-Chinese", price: 30, isVeg: true, imageUrl: "/uploads/1758461584855-chana Chilli.png" },
  { name: "Onion Pakora", description: "Garam crispy pyaz pakode.", category: "Indo-Chinese", price: 90, isVeg: true, imageUrl: "/uploads/1761891544685-Onion Pakora.png" },
  { name: "Paneer Pakora", description: "Crispy paneer bites dhaba style.", category: "Indo-Chinese", price: 150, isVeg: true, imageUrl: "/uploads/1758470305727-Paneer pakora.png" },
  { name: "Omelette (2 pc)", description: "Masaledar anda omelette.", category: "Indo-Chinese", price: 50, isVeg: false, imageUrl: "/uploads/1761891846932-Omalate.png" },
  { name: "Egg-Chana Fry", description: "Anda aur chana ka spicy mix.", category: "Indo-Chinese", price: 110, isVeg: false, imageUrl: "/uploads/1761892458810-egg chana.png" },
  { name: "Fish Fry (2 pc)", description: "Crispy fish fry with lemon.", category: "Indo-Chinese", price: 50, isVeg: false, imageUrl: "/uploads/1758461184583-fish Fried.png" },
  { name: "Egg-Bhurji (2 pc)", description: "Spicy anda bhurji dhaba style.", category: "Indo-Chinese", price: 50, isVeg: false, imageUrl: "/uploads/1761892519549-egg bhurji.png" },
  { name: "French Fries", description: "Crispy golden aloo fries.", category: "Indo-Chinese", price: 110, isVeg: true, imageUrl: "/uploads/1761892611913-French Fries.png" },
  { name: "Chicken Pakora", description: "Juicy crispy chicken pakoda.", category: "Indo-Chinese", price: 230, isVeg: false, imageUrl: "/uploads/1761892703345-chicken Pakora.png" },
  { name: "Chicken Roast", description: "Spicy roasted chicken dhaba style.", category: "Indo-Chinese", price: 230, isVeg: false, imageUrl: "/uploads/1761892804692-chicken roast.png" },
  { name: "Chicken Dry Fry", description: "Dry masaledar chicken fry.", category: "Indo-Chinese", price: 230, isVeg: false, imageUrl: "/uploads/1761892870752-chicken dry fry.png" },
  { name: "Chicken Lollipop", description: "Spicy chicken lollipop.", category: "Indo-Chinese", price: 230, isVeg: false, imageUrl: "/uploads/1761892959254-chicken Lollipop.png" },
  { name: "Chicken Chilli", description: "Indo-Chinese spicy chicken.", category: "Indo-Chinese", price: 190, isVeg: false, imageUrl: "/uploads/1761894106687-chicken Chilli (1).png" },
  { name: "Paneer Chilli", description: "Spicy paneer chilli.", category: "Indo-Chinese", price: 190, isVeg: true, imageUrl: "/uploads/1761894218504-Paneer Chilli.png" },
  { name: "Mushroom Chilli", description: "Spicy mushroom chilli fry.", category: "Indo-Chinese", price: 190, isVeg: true, imageUrl: "/uploads/1761894318465-Mushroom chilii.png" },
  { name: "Baby Corn Chilli", description: "Crispy baby corn chilli.", category: "Indo-Chinese", price: 190, isVeg: true, imageUrl: "/uploads/1761894421747-Baby corn chilii.png" },
  { name: "American Corn Salt & Pepper", description: "Butter tossed corn with pepper.", category: "Indo-Chinese", price: 170, isVeg: true, imageUrl: "/uploads/1771148907945-American corn.png" },
  { name: "Veg Manchurian", description: "Indo-Chinese veg manchurian balls.", category: "Indo-Chinese", price: 170, isVeg: true, imageUrl: "/uploads/1758472069981-veg manchurian.png" },

  // ===================== ROTI & PARATHA =====================
  { name: "Tawa Roti", description: "Soft garam tawa roti.", category: "Roti & Paratha", price: 10, isVeg: true, imageUrl: "/uploads/1758472308786-Tawa Roti.png" },
  { name: "Plain Paratha", description: "Layered plain paratha.", category: "Roti & Paratha", price: 30, isVeg: true, imageUrl: "/uploads/1758472467618-Plain Paratha.png" },
  { name: "Aloo Paratha", description: "Stuffed aloo paratha.", category: "Roti & Paratha", price: 50, isVeg: true, imageUrl: "/uploads/1758472592935-aloo Paratha.png" },
  { name: "Pyaz Paratha", description: "Onion stuffed paratha.", category: "Roti & Paratha", price: 50, isVeg: true, imageUrl: "/uploads/1758472721389-Pyaj Paratha.png" },
  { name: "Sattu Paratha", description: "Bihari style sattu paratha.", category: "Roti & Paratha", price: 50, isVeg: true, imageUrl: "/uploads/1758475692423-Sattu Paratha.png" },
  { name: "Paneer Paratha", description: "Paneer stuffed paratha.", category: "Roti & Parathas", price: 50, isVeg: true, imageUrl: "/uploads/1758475862797-Paneer Paratha.png" },

  // ===================== Main Courses =====================
  { name: "Chicken Curry", description: "Desi masaledar chicken gravy.", category: "Main Courses", price: 200, isVeg: false, imageUrl: "/uploads/1758482804454-_chicken.png" },
  { name: "Chicken Butter Masala", description: "Creamy butter chicken.", category: "Main Courses", price: 240, isVeg: false, imageUrl: "/uploads/1758483169436-chicken butter.png" },
  { name: "Chicken Kadai", description: "Spicy kadai chicken.", category: "Main Courses", price: 300, isVeg: false, imageUrl: "/uploads/1758484138038-chicken kadahi.png" },
  { name: "Mutton Curry", description: "Slow cooked mutton curry.", category: "Main Courses", price: 300, isVeg: false, imageUrl: "/uploads/1758517398596-mutton curry.png" },
  { name: "Paneer Masala", description: "Rich paneer masala gravy.", category: "Main Courses", price: 180, isVeg: true, imageUrl: "/uploads/1758514515167-dal Fry.png" },
  { name: "Palak Paneer", description: "Spinach paneer dhaba style.", category: "Main Courses", price: 160, isVeg: true, imageUrl: "/uploads/1758516811141-palak paneer.png" },
  { name: "Dal Fry", description: "Simple desi dal fry.", category: "Main Courses", price: 80, isVeg: true, imageUrl: "/uploads/1758514082377-dal Fry.png" },

  // ===================== RICE =====================
  { name: "Rice", description: "Simple steamed rice.", category: "Biryani & Rice", price: 50, isVeg: true, imageUrl: "/uploads/1758517676729-Steam Rice.png" },
  { name: "Jeera Rice", description: "Jeera flavored basmati rice.", category: "Biryani & Rice", price: 100, isVeg: true, imageUrl: "/uploads/1758518210317-jeera Rice.png" },
  { name: "Chicken Fried Rice", description: "Desi style chicken fried rice.", category: "Biryani & Rice", price: 160, isVeg: false, imageUrl: "/uploads/1758519489945-Chicken fried Rice.png" },

  // ===================== BIRYANI =====================
  { name: "Veg Biryani", description: "Aromatic veg dum biryani.", category: "Biryani & Rice", price: 140, isVeg: true, imageUrl: "/uploads/1758519727191-veg Biryani.png" },
  { name: "Chicken Biryani", description: "Spicy dum chicken biryani.", category: "Biryani & Rice", price: 180, isVeg: false, imageUrl: "/uploads/1758519945824-chicken Biryani.png" },

  // ===================== THALI =====================
  { name: "Veg Thali", description: "Complete veg meal platter.", category: "Dhaba Special", price: 80, isVeg: true, imageUrl: "/uploads/1758521907846-mutton  thali.png" },
  { name: "Mutton Thali", description: "Full desi mutton meal.", category: "Dhaba Special", price: 160, isVeg: false, imageUrl: "/uploads/1758521907846-mutton  thali.png" },

];


await Item.insertMany(menuItems);

    console.log("Menu Seeded Successfully 🌶️🔥");
    process.exit();
  } catch (error) {
    console.error("SEED ERROR:", error);
    process.exit(1);
  }
};

seedDatabase();
