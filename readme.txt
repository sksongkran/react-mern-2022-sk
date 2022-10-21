# create react-js project 
npx create-react-app demo0
npx create-react-app <name> --template typescript
yarn
yarn add @emotion/react @emotion/styled @mui/icons-material @mui/material @mui/x-data-grid chart.js react-chartjs-2 @react-hook/debounce react-router-dom @types/react-router-dom axios moment react-moment url-join react-number-format react-redux redux @reduxjs/toolkit react-hook-form faker@5.5.3 @types/faker@5.5.3 yup @hookform/resolvers  


#install mui
mui.com


#tailwindcss
npx tailwindcss init -p

@tailwind components;
@tailwind utilities;
เอาไปไว้ใน index.css

เอาไปไว้ใน tailwind.config.js
content: ["./src/**/*.{js,jsx,ts,tsx}"],
important:"#root",

สร้าง component InjectTaiwind.tsx
import{StyledEngineProvider} from '@mui/material/styles'
import React from 'react'

export default function InjectTaiwind({ children }:any){
    return <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
}



# Page Components
// In Pages
cd src/components/pages
yarn add global create-react-component-folder
npx crcf -f --notest --typescript LoginPage RegisterPage
npx crcf -f --notest --typescript ReportPage StockPage StockCreatePage StockEditPage AboutUs



# vscode extension 
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension vscode-icons-team.vscode-icons
code --install-extension naumovs.color-highlight
code --install-extension esbenp.prettier-vscode
code --install-extension humao.rest-client
code --install-extension riazxrazor.html-to-jsx
code --install-extension christian-kohler.path-intellisense
code --install-extension zignd.html-css-class-completion
