 
          import React from 'react'
        import * as RN from "react-native-web";
        import { create } from 'zustand';
        import Svg from 'react-native-svg';
        import * as SvgObj from 'react-native-svg';
  

// ----------- set Arguments Selection

 const argSel = (args, inputStr) => {
  const path = inputStr.replace('#', '');
  const value = pathSel(args, path);
  return value;
};
  

 const getCtData = (path) => {
  const ct = useData.getState();
  const varValue = pathSel(ct, path);
  return varValue;
};
  

// ----------- set Style Variable Selection
 const getStlValues = (arrGetValues) => {
  const allStls = arrGetValues.flatMap(style => {
    if (style.shadowOffset) return style;

    const possibleValues = Object.keys(style);

    const setPx = (stlVal) => {
      const checkNum = typeof stlVal === 'number';
      const condVal = checkNum ? String(stlVal) + 'px' : stlVal;

      return condVal;
    };
    const result = possibleValues.flatMap(key => {
      const stlVal = style[key];

      const [condVar, varValue] = getVarValue(stlVal, 'noComponent');

      if (!condVar) {
        const valToPx = String(setPx(stlVal));
        const process2 = getStylesForProperty(key, valToPx);
        // console.log({ process2 });
        return process2;
      }

      const varToPx = String(setPx(varValue));
      const process3 = getStylesForProperty(key, varToPx, true);
      console.log({ process3 });
      return process3;
    });

    return result;
  });

  return allStls;
};

// ----------- set Variable Selection

 const getVarValue = ( path, setGet ) => {
  const checkString = typeof path !== 'string';
  if (checkString) return [false, null];

  const condBool = path.includes('{{') && path.includes('}}');
  if (!condBool) return [false, null];

  const varPath = path.replace('{{', '').replace('}}', '');
  if (setGet === 'noComponent') {
    const varValue = getCtData(varPath);
    console.log('dentro getCtData', { varValue });
    return [true, varValue];
  }

  const varValue = useData(ct => pathSel(ct, varPath));
  return [true, varValue];
};


// ---------- set GoTo Router (with All Screens Access)
 const goTo = (newRoute) =>
  useRoutes.setState({ currRoute: newRoute });

    
  const initCt = {
  colors: {},
  textSizes: {},
  apiData: {},
  toggles: {},
  colors2: {},
  textSizes2: {},
  toggles2: {},
  apiData2: {},
  true: 'true',
  content: {},
  userData: {},
  formsData: {},
  dev: {},
  endpoint: '',
  listsData: {},
  infinite: false,
  teste: '...',
  mocks: {},
  all: {},
  autocomp: {},
  mergedObj: {},
  sc: {},
};

 const mapElements = (list, args) => {
  const condCall = list.flatMap(i => i).length > 0;
  const renderList = () =>
    list.map((Item, idx) => (
      <React.Fragment key={idx}>{Item(args)}</React.Fragment>
    ));
  return condCall ? renderList() : <></>;
};
  
  // ----------- set Path Selection
   const pathSel = (obj, path) => {
    const pathArr = path.split('.');
  
    const reduceCb = (p, c) => {
      return p && p[c];
    };
    const valueSel = pathArr.reduce(reduceCb, obj);
  
    return valueSel;
  };
  

 const setArgsVars = (value, args) => {
  const checkArgs = value.startsWith('#');
  if (checkArgs) return argSel(args, value);

  // ---------- set Vars (If Exists)
  const [condVar, varValue] = getVarValue(value, 'noComponent');
  if (condVar) return varValue;

  return value;
};

  

 const setData = ({ path, value }) => {
  return useData.setState(ct => {
    const newObj = { ...ct };

    const setVal = (prev, curr, i, arr) => {
      const condNext = arr[i + 1];
      const condSelItem = () => prev[curr] || (prev[curr] = {});
      const newVal = () => (prev[curr] = value);
      const condVal = condNext ? condSelItem() : newVal();
      return condVal;
    };

    path.split('.').reduce(setVal, newObj);

    return newObj;
  });
};

  
    
    const useData = create(() => ({ ...initCt }));
  const devVars = {
  all: {
    userData: {
      userName: 'Carlos',
    },
    static: {
      teste: 'ola',
    },
    toggles: {},
  },
  sc: {
    A1: {},
    B1: {},
  },
};
    //---------- SvgView

    const SvgView2 = (props) => {
      // ---------- set Caps Inputs
      const { componentSvg, altura, largura, preenchimento, args } = props.pass;

      const [SttComponent, setComponent] = React.useState(<></>);
      console.log({ preenchimento });
      const setNewComp = async () => componentSvg(Svg, SvgObj);

      // ---------- set Arguments and Variables (If Exists)
      const iptFill = preenchimento.reduce(
        (prev, curr) => prev + curr,
        ""
      );

      const newComp = (Comp) => (
        <Comp height={altura} width={largura} fill={iptFill} />
      );

      React.useEffect(() => {
        setNewComp().then((Comp) => setComponent(newComp(Comp)));
      }, []);

      console.log({ iptFill, SttComponent });
      return <>{SttComponent}</>;
    };

     const SvgView1 = (props) => {
  
    const {svgString, svgOriginal, altura, largura, preenchimento} = props
      const platform = RN.Platform.OS
      if(platform === 'web'){
          let newSvg = { ...svgOriginal };
          const props = svgOriginal.props;
          newSvg.props = {
            ...props,
            height: altura,
            width: largura,
            stroke: preenchimento,
          };
          return <RN.View>{newSvg}</RN.View>;
        } else {
        return(
          <SvgView2
            pass={{
              componentSvg: svgString,
              altura: 100,
              largura: 100,
              preenchimento: [preenchimento],
            }}
          />
        )
      }
    };
  
  

        export default function App (  ) {
          const initRouter = { current: 'home', list: [] };
          const [sttRouter, setRouter] = React.useState(initRouter);
          const [sttInit, setInit] = React.useState(true);

          const [sttComps, setComps] = React.useState([]);

          sttInit && fxInitLoop(sttInit,setInit,sttRouter,setRouter,setComps);

          let CurrScreen;

          sttComps.forEach(props => {
            if (!props) return;
            const { path, comp } = props;
            if (sttRouter.current === path) CurrScreen = comp;
          });

          if (!CurrScreen) {
            const firstItem = sttComps[0];
            if (!firstItem) return <></>;

            const FirstScreen = firstItem.comp;
            return <FirstScreen />;
          }

          return <CurrScreen />;
        }

        const fxInitLoop = (sttInit,setInit,sttRouter,setRouter,setComps) => {
          const funcToComps = [
              ({ getRoute, goTo }) => {
                const screenData = { path: 'home', name: 'Home' };
                getRoute(screenData.path);

                const Comp = () => {
                  const stlView = {
                    backgroundColor: 'black',

                    height: '100%',
                    width: '100%',

                    justifyContent:'center',
                    alignItems:'center',
                  }

                  const stlText1 = {
                    color:'#aaa',
                    marginTop: 20,
                    fontSize: 20,
                    textAlign:'center',
                  };

                  return (
                    <RN.View style={stlView}>
                      <RN.Text
                        style={stlText1}
                        children='Adicione uma tela para iniciar!'
                        />
                    </RN.View>
                  )
                };

                return { path: screenData.path, comp: Comp };

                return (
                  <RN.Text children='Bem-Vindo!'/>
                )
              }
              ]

          const getComps = funcToComps.map(setItem => {
            if (!sttInit) return;

            const getRoute = (route) => {
              const newRoute = { ...sttRouter, list: [...sttRouter.list, route] };
              setRouter(newRoute);
            };

            const goTo = (path) => {
              const changeRoute = { ...sttRouter, current: path };
              setRouter(changeRoute);
            };

            setInit(false);
            const Comp = setItem({ getRoute, goTo });

            return Comp;
          });

          setComps(getComps);
        };


        RN.AppRegistry.registerComponent("App", () => App)

        RN.AppRegistry.runApplication("App", {
          rootTag: document.getElementById("root")
        });
        
  