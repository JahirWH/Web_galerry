const cloudName = "ded64e7d-fe54-4cdf-bad1-b2de1b712b05";
const uploadPreset = "Web_gallery";

function enviar_img() {
    document.getElementById("img").click();
    document.getElementById("img").addEventListener("change", async e => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
        method: "POST",
        body: formData
        }
    );

    const data = await res.json();
    console.log("URL:", data.secure_url);

    document.getElementById("preview").src = data.secure_url;
    });
}