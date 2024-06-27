
    import { create } from 'zustand';
    import { initCt } from './tools/base/project/initCt.js';
    
    const useData = create(() => ({ ...initCt }));
  