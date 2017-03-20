import React from "react";
import ReactDOM from 'react-dom';
import './canvas.css';


export default class Canvas extends React.Component {
    componentDidMount() {
        this.updateCanvas();
    }
    updateCanvas() {
      var canvas,ctx,count,tim;
      canvas = document.getElementsByTagName('canvas')[0];
      ctx = canvas.getContext('2d');
      canvas.width=canvas.height=400;
      count=0;
      aaa();

      function aaa(){
          var a,b,c,max,pt,p,r;
          ctx.fillStyle="rgb(255,250,250)";
          ctx.fillRect(0,0,canvas.width,canvas.height);
          ctx.lineWidth=2;
          if(count>=200)count=0;
          tim=count/200*Math.PI*2;
          ctx.strokeStyle="hsl(244,50%,60%)";
          max=1000;


          pt=[];
          for(c=0;c<max;c++){
              r=c/(max-1)*Math.PI*2;
              pt.push(aff(r,1));
          }
          for(b=0;b<8;b++){
              ctx.beginPath();
              for(a=0;a<pt.length;a++){
                  ctx.lineTo(pt[a][b][0],pt[a][b][1]);
              }
              ctx.stroke();
          }

          p=aff(tim);
          ctx.lineWidth=2;
          ctx.strokeStyle="hsl(0,60%,50%)";
          for(b=0;b<2;b++){
              ctx.beginPath();
              c=b*4;
      ctx.lineTo(p[c][0],p[c][1]);
      ctx.lineTo(p[c+1][0],p[c+1][1]);
      ctx.lineTo(p[c+3][0],p[c+3][1]);
      ctx.lineTo(p[c+2][0],p[c+2][1]);
              ctx.closePath();
              ctx.stroke();
          }

          for(a=0;a<4;a++){
              ctx.beginPath();
              ctx.lineTo(p[a][0],p[a][1]);
              ctx.lineTo(p[a+4][0],p[a+4][1]);
              ctx.stroke();
          }

          ctx.fillStyle="rgb(255,89,0)";
          for(a=0;a<8;a++){
              b=p[a];
              ctx.beginPath();
              ctx.arc(b[0],b[1],6,0,Math.PI*2,0);
              ctx.fill();
          }
          count++;
          requestAnimationFrame(aaa);
      }

      function aff(r,fl){
          var a,b,x,y,z,p,x0,y0,x1,y1,z1,
              xp,yp,zp,xc,xs,yc,ys,zc,zs;
      p=[];
      for(a=0;a<8;a++){
      p[a]=[];
      for(b=0;b<3;b++){
      p[a][b]=((a&(1<<b))>>b)?1:-1;
      }
      }
          if(fl){
              xp=r/4*3;
              xc=Math.cos(xp+tim);
              xs=Math.sin(xp+tim);
          }else{
              xp=r/4*7;
              xc=Math.cos(xp);
              xs=Math.sin(xp);
          }
          yp=r/4*2;
          yc=Math.cos(yp);
          ys=Math.sin(yp);
          zp=-r/4*2;
          zc=Math.cos(zp);
          zs=Math.sin(zp);

          for(a=0;a<p.length;a++){
              b=p[a];
              x=b[0];
              y=b[1];
              z=b[2];
              x0=x*zc-y*zs;
              y0=x*zs+y*zc;
              y1=y0*yc-z*ys;
              z1=y0*ys+z*yc;
              x1=x0*xc-z1*xs;
              z1=x0*xs+z1*xc;
              b[0]=x1*100+canvas.width/2;
              b[1]=y1*100+canvas.height/2;
              b[2]=z1;
          }
          return p;
      }
    }
    render() {
        return (
            <canvas ref="canvas" width={300} height={300}/>
        );
    }
}
