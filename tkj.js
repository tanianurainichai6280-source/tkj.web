// Array untuk menyimpan data siswa (Data Awal Dummy)
let students = [
    { nis: "20261001", nama: "Domian Syahrena Moza", kelas: "XI TKJ 1", absen: 6, gender: "P" },
    { nis: "20261029", nama: "Tania Nurainni Chairunnissa", kelas: "XI TKJ 1", absen: 29, gender: "P" }
];

// Inisialisasi saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", function () {
    renderTable();

    // Event Listener Submit Form
    document.getElementById("studentForm").addEventListener("submit", function (e) {
        e.preventDefault();
        saveStudent();
    });
});

// Fungsi Tampilkan Alert Status
ariaAlert = (message, isSuccess = true) => {
    const alertBox = document.getElementById("alertBox");
    const alertMessage = document.getElementById("alertMessage");
    const alertIcon = document.getElementById("alertIcon");

    alertBox.classList.remove("hidden", "bg-green-100", "text-green-800", "border-green-300", "bg-red-100", "text-red-800", "border-red-300");

    if (isSuccess) {
        alertBox.classList.add("bg-green-100", "text-green-800", "border", "border-green-300");
        alertIcon.className = "fa-solid fa-circle-check text-green-600 text-lg";
    } else {
        alertBox.classList.add("bg-red-100", "text-red-800", "border", "border-red-300");
        alertIcon.className = "fa-solid fa-triangle-exclamation text-red-600 text-lg";
    }

    alertMessage.innerText = message;
};

function hideAlert() {
    document.getElementById("alertBox").classList.add("hidden");
}

// Render Tabel Data Siswa
function renderTable() {
    const tbody = document.getElementById("studentTableBody");
    const searchVal = document.getElementById("searchField").value.toLowerCase();
    tbody.innerHTML = "";

    const filtered = students.filter(s =>
        s.nama.toLowerCase().includes(searchVal) || s.nis.toLowerCase().includes(searchVal)
    );

    document.getElementById("totalCount").innerText = filtered.length;

    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="px-4 py-8 text-center text-gray-400 italic">
                    Data siswa tidak ditemukan.
                </td>
            </tr>
        `;
        return;
    }

    filtered.forEach((siswa, index) => {
        const originalIndex = students.indexOf(siswa);
        const tr = document.createElement("tr");
        tr.className = "hover:bg-blue-50/50 transition";
        tr.innerHTML = `
            <td class="px-4 py-3 font-semibold text-gray-500">${index + 1}</td>
            <td class="px-4 py-3 font-mono text-xs font-bold text-blue-900">${siswa.nis}</td>
            <td class="px-4 py-3 font-semibold text-gray-800">${siswa.nama}</td>
            <td class="px-4 py-3"><span class="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full font-semibold">${siswa.kelas}</span></td>
            <td class="px-4 py-3 text-center">${siswa.absen}</td>
            <td class="px-4 py-3 text-center">
                <span class="${siswa.gender === 'L' ? 'text-blue-600 bg-blue-50' : 'text-pink-600 bg-pink-50'} text-xs px-2 py-0.5 rounded font-bold border">
                    ${siswa.gender}
                </span>
            </td>
            <td class="px-4 py-3 text-center space-x-1">
                <button onclick="editStudent(${originalIndex})" class="px-2.5 py-1 text-xs bg-amber-500 hover:bg-amber-600 text-white rounded font-medium transition" title="Edit Data">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button onclick="deleteStudent(${originalIndex})" class="px-2.5 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded font-medium transition" title="Hapus Data">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Simpan atau Update Data Siswa
function saveStudent() {
    const nama = document.getElementById("inputNama").value.trim();
    const nis = document.getElementById("inputNis").value.trim();
    const kelas = document.getElementById("selectKelas").value;
    const absen = document.getElementById("inputAbsen").value;
    const gender = document.getElementById("selectGender").value;
    const editIndex = parseInt(document.getElementById("editIndex").value);

    // Validasi Form
    if (!nama || !nis || !kelas || !absen) {
        ariaAlert("Harap isi semua kolom pendaftaran yang wajib diisi!", false);
        return;
    }

    if (editIndex === -1) {
        // Mode Tambah Data
        students.push({ nama, nis, kelas, absen, gender });
        ariaAlert(`Data siswa "${nama}" berhasil ditambahkan!`, true);
    } else {
        // Mode Update Data
        students[editIndex] = { nama, nis, kelas, absen, gender };
        ariaAlert(`Data siswa "${nama}" berhasil diperbarui!`, true);
    }

    resetForm();
    renderTable();
}

// Edit Data Siswa
function editStudent(index) {
    const siswa = students[index];
    document.getElementById("inputNama").value = siswa.nama;
    document.getElementById("inputNis").value = siswa.nis;
    document.getElementById("selectKelas").value = siswa.kelas;
    document.getElementById("inputAbsen").value = siswa.absen;
    document.getElementById("selectGender").value = siswa.gender;
    document.getElementById("editIndex").value = index;

    document.getElementById("btnSubmitText").innerText = "Update Data";
    document.getElementById("btnSubmit").className = "px-5 py-2 text-sm bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg shadow transition flex items-center gap-1";

    hideAlert();
    document.getElementById("pendataan").scrollIntoView({ behavior: "smooth" });
}

// Hapus Data Siswa
function deleteStudent(index) {
    const namaSiswa = students[index].nama;
    if (confirm(`Apakah Anda yakin ingin menghapus data siswa ${namaSiswa}?`)) {
        students.splice(index, 1);
        ariaAlert(`Data siswa "${namaSiswa}" telah berhasil dihapus.`, true);
        renderTable();
    }
}

// Reset Form Input
function resetForm() {
    document.getElementById("studentForm").reset();
    document.getElementById("editIndex").value = "-1";
    document.getElementById("btnSubmitText").innerText = "Simpan / Tambah Data";
    document.getElementById("btnSubmit").className = "px-5 py-2 text-sm bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-lg shadow transition flex items-center gap-1";
}