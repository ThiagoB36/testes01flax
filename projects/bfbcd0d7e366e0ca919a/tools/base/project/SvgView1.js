
    //---------- SvgView
    import React from 'react'
    import * as RN from "react-native-web";
    import Svg from 'react-native-svg';
    import * as SvgObj from 'react-native-svg';

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

    export const SvgView1 = (props) => {
  
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
  