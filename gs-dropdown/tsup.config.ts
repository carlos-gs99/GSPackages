import{defineConfig}from'tsup';export default defineConfig({entry:['src/index.ts'],format:['esm','cjs'],dts:true,clean:true,target:'es2020',external:['react','@carlos-gs99/hooks','@carlos-gs99/primitives','@carlos-gs99/gs-button','@carlos-gs99/gs-list']});

