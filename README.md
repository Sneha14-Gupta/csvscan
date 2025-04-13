# 📄 csvscan

**csvscan** is a lightweight, powerful CLI tool for validating and cleaning CSV files. Designed for developers, data analysts, and engineers, it helps ensure data integrity by checking for formatting issues, invalid values, and generating clean, structured output and detailed reports.

---

## 🚀 Features

- ✅ **Data validation** using built-in and customizable rules
- 🧹 **Cleaned CSV output** for downstream processing
- 📝 **Comprehensive report** on invalid entries and errors
- 🖥️ **Simple CLI interface** with rich terminal output
- 🌐 Supports Node.js ESM module system (`"type": "module"`)
- ✨ Styled logs and messages using `chalk`
- 📋 Validates formats like email, phone, URLs, etc. with `validator`
- 🧠 Intelligent parsing with `papaparse`
- ⚙️ Easily extendable with custom rules

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Sneha14-Gupta/csvscan.git
cd csvscan

## ✅ Built-in Validation Rules
These rules are powered by validator and csvguard:

Email – Validates email format
URL – Checks for valid HTTP/HTTPS URLs
Phone Number – Detects valid global phone numbers
Required Fields – Ensures non-empty values
Alphanumeric – Letters and numbers only
Length constraints – Min/max length checks
Custom rules – You can define your own validator function
