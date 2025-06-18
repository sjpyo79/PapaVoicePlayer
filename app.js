const fileInput = document.getElementById('fileInput');
const audioPlayer = document.getElementById('audioPlayer');
const buttonContainer = document.getElementById('buttonContainer');

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith('audio/')) {
    const url = URL.createObjectURL(file);
    audioPlayer.src = url;
    audioPlayer.play();
  } else {
    alert('m4a 또는 오디오 파일을 선택해주세요.');
  }
});

// PWA 서비스 워커 등록
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js');
  });
}

// SoundFiles 폴더 내 m4a 파일 목록을 불러와 버튼 생성
fetch('SoundFiles/list.json')
  .then(res => res.json())
  .then(files => {
    files.forEach(filename => {
      const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
      const btn = document.createElement('button');
      btn.textContent = nameWithoutExt;
      btn.addEventListener('click', () => {
        audioPlayer.src = `SoundFiles/${filename}`;
        audioPlayer.play();
      });
      buttonContainer.appendChild(btn);
    });
  }); 