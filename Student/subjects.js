import { db } from "./firebase.js";
import {
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    deleteDoc,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const maMon = document.getElementById("maMon");
const tenMon = document.getElementById("tenMon");
const maKhoa = document.getElementById("maKhoa");

const btnSave = document.querySelector(".save-btn");
const btnDelete = document.querySelector(".delete-btn");
const btnRefresh = document.querySelector(".refresh-btn");
const subjectTable = document.getElementById("subjectTable").querySelector("tbody");

// Thêm hoặc cập nhật môn học
btnSave.addEventListener("click", async () => {
    const id = maMon.value.trim();
    if (!id) return alert("Vui lòng nhập mã môn!");

    const data = {
        maMon: id,
        tenMon: tenMon.value.trim(),
        maKhoa: maKhoa.value.trim(),
    };

    try {
        await setDoc(doc(db, "MonHoc", id), data);
        alert("Đã lưu thông tin môn học!");
        clearForm();
        loadSubjects();
    } catch (error) {
        console.error("Lỗi khi lưu:", error);
    }
});

// Xóa môn học
// btnDelete.addEventListener("click", async () => {
//     const id = maMon.value.trim();

//     if (confirm(`Bạn chắc chắn muốn xóa môn học ${id}?`)) {
//         try {
//             await deleteDoc(doc(db, "MonHoc", id));
//             alert("Đã xóa môn học!");
//             clearForm();
//             loadSubjects();
//         } catch (error) {
//             console.error("Lỗi khi xóa:", error);
//         }
//     }
// });


// Hiển thị danh sách môn học
async function loadSubjects() {
    subjectTable.innerHTML = "";
    const querySnapshot = await getDocs(collection(db, "MonHoc"));
    querySnapshot.forEach((docSnap) => {
        const d = docSnap.data();
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${d.maMon}</td>
      <td>${d.tenMon}</td>
      <td>${d.maKhoa}</td>
      <td>
        <button class="editRow">Sửa</button>
        <button class="deleteRow">Xóa</button>
      </td>
    `;

        // Gán sự kiện cho từng dòng
        row.querySelector(".editRow").addEventListener("click", () => fillForm(d));
        row.querySelector(".deleteRow").addEventListener("click", async () => {
            if (confirm(`Xóa môn học ${d.maMon}?`)) {
                await deleteDoc(doc(db, "MonHoc", d.maMon));
                loadSubjects();
            }
        });

        subjectTable.appendChild(row);
    });
}

// Đổ dữ liệu vào form khi bấm "sửa"
function fillForm(data) {
    maMon.value = data.maMon;
    tenMon.value = data.tenMon;
    maKhoa.value = data.maKhoa;
}

// Xóa trắng form
function clearForm() {
    maMon.value = "";
    tenMon.value = "";
    maKhoa.value = "";
}

loadSubjects();