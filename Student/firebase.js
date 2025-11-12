import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { 
  getFirestore, collection, doc, setDoc, getDocs 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";


  const firebaseConfig = {
  apiKey: "AIzaSyCV7ciLNH1WgaMcSy9vIyITOfQ5LFjVXDU",
  authDomain: "quanlysinhvien-39.firebaseapp.com",
  projectId: "quanlysinhvien-39",
  storageBucket: "quanlysinhvien-39.firebasestorage.app",
  messagingSenderId: "499046131803",
  appId: "1:499046131803:web:7e77f17c8a55f2e3c9777e",
  measurementId: "G-ZTES2VRRZY"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Dl
const ho = ["Nguyen", "Tran", "Le", "Pham", "Hoang", "Dang", "Do", "Vu", "Bui", "Ngo"];
const tenDem = ["Van", "Thi", "Huu", "Minh", "Thanh", "Ngoc", "Quoc", "Gia", "Bao", "Thuy"];
const ten = ["An", "Binh", "Chi", "Duc", "Hanh", "Khanh", "Linh", "Nam", "Phuong", "Tuan"];
const tinh = ["Ha Noi", "Da Nang", "Ho Chi Minh", "Hai Phong", "Can Tho", "Dong Nai", "Quang Nam", "Nghe An"];
const diaChi = ["Cau Giay", "Thanh Khe", "Quan 1", "Le Chan", "Ninh Kieu", "Bien Hoa", "Tam Ky", "Vinh"];

const random = arr => arr[Math.floor(Math.random() * arr.length)];
const randomDate = () => {
  const start = new Date(2000, 0, 1);
  const end = new Date(2005, 11, 31);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split("T")[0];
};

//ID = maSV
export async function addRandomStudents() {
  for (let i = 1; i <= 100; i++) {
    const maSV = "SV" + i.toString().padStart(3, "0");
    const maTK = "TK" + i.toString().padStart(3, "0");
    const hoten = `${random(ho)} ${random(tenDem)} ${random(ten)}`;
    const ngaysinh = randomDate();
    const quequan = random(tinh);
    const diachi = random(diaChi);
    const SDT = "09" + Math.floor(10000000 + Math.random() * 90000000);
    const email = `sv${i}@gmail.com`;

    await setDoc(doc(collection(db, "SinhVien"), maSV), {
      maSV,
      hoten,
      ngaysinh,
      quequan,
      diachi,
      SDT,
      email,
      maTK
    });
    console.log(`Đã thêm sinh viên ${maSV}`);
  }
  alert("Đã thêm 100 sinh viên với ID = maSV vào Firestore!");
}

//Lấy ds sv
export async function fetchStudents() {
  const querySnapshot = await getDocs(collection(db, "SinhVien"));
  return querySnapshot.docs.map(doc => doc.data());
}

export { db };
