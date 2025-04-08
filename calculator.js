let calculated = false;

function append(num) {
  const resultField = document.getElementById("result");

  if (calculated && "+-*/%".includes(num)) {
    resultField.value = "0";
  }

  let element = resultField.value;
  if (element === "0" || element === "Error") element = num;
  else element += num;

  resultField.value = element;
  resultField.style.color = "yellow";
  calculated = false;
}

function calculate() {
  const resultField = document.getElementById("result");
  const element = resultField.value;

  try {
    let result = eval(element);
    if (isNaN(result) || !isFinite(result)) throw new Error("Invalid");
    resultField.value = result;
    resultField.style.color = "yellow";
  } catch (e) {
    resultField.value = "Error";
    resultField.style.color = "red";
    console.error("Calculation error:", e.message);
  }

  calculated = true;
}

function backSpace() {
  const resultField = document.getElementById("result");
  let result = resultField.value;
  if (result.length === 1 || result === "Error") result = "0";
  else result = result.slice(0, -1);

  resultField.value = result;
  resultField.style.color = "black";
}

function changeSign() {
  const resultField = document.getElementById("result");
  let value = resultField.value;

  if (value === "Error") return;

  try {
    let num = eval(value);
    num = -num;
    resultField.value = num;
    resultField.style.color = "black";
    calculated = true;
  } catch {
    resultField.value = "Error";
    resultField.style.color = "red";
  }
}

function memorySave() {
  let result = document.getElementById("result").value;
  if (result !== "Error" && +result !== 0)
    localStorage.setItem("data", result);
}

function memoryRestore() {
  let data = localStorage.getItem("data") ?? "0";
  document.getElementById("result").value = data;
  document.getElementById("result").style.color = "black";
  calculated = true;
}

function memoryAdd() {
  let calcData = document.getElementById("result").value;
  if (calcData === "Error") return;
  if (+calcData !== 0) {
    let memoryData = +localStorage.getItem("data") || 0;
    localStorage.setItem("data", +calcData + memoryData);
  }
}

function memoryMinus() {
  let calcData = document.getElementById("result").value;
  if (calcData === "Error") return;
  if (+calcData !== 0) {
    let memoryData = +localStorage.getItem("data") || 0;
    let result = memoryData - calcData;
    if (result === 0) localStorage.removeItem("data");
    else localStorage.setItem("data", result);
  }
}

function memoryCancel() {
  localStorage.removeItem("data");
}

function clearAll() {
  document.getElementById("result").value = "0";
  document.getElementById("result").style.color = "black";
  calculated = false;
}

// Toggle between calculators
function toggleMode() {
  const standardCalc = document.getElementById("standardCalculator");
  const siCalc = document.getElementById("siCalculator");

  if (standardCalc.style.display === "none") {
    standardCalc.style.display = "block";
    siCalc.style.display = "none";
  } else {
    standardCalc.style.display = "none";
    siCalc.style.display = "block";
  }
}

// Simple Interest Calculator
function calculateSI() {
  const p = parseFloat(document.getElementById("principal").value);
  const r = parseFloat(document.getElementById("rate").value);
  const t = parseFloat(document.getElementById("time").value);
  const resultField = document.getElementById("siResult");

  if (isNaN(p) || isNaN(r) || isNaN(t)) {
    resultField.textContent = "Please enter valid numbers.";
    resultField.style.color = "red";
    return;
  }

  const si = (p * r * t) / 100;
  resultField.textContent = `Simple Interest = ₹${si.toFixed(2)}`;
  resultField.style.color = "green";
}
