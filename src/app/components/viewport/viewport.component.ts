import { Component, ElementRef, ViewChild } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { CertificateService } from 'src/app/services/controllers/certificate.service';
import { environment } from 'src/environments/environment';
import { certificate } from 'src/app/models/certificate';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/services/tools/image-service.service';
import jsPDF from 'jspdf';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import QRious from 'qrious';
import 'jspdf-autotable';
import { Location } from '@angular/common';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { toBlob } from 'dom-to-image';
@Component({
  selector: 'app-viewport',
  templateUrl: './viewport.component.html',
  styleUrls: ['./viewport.component.scss']
})
export class ViewportComponent {
  @ViewChild('content') content!: ElementRef;
  id!: string | null;
  isVertical = false;
  certificateData: certificate[] = [];
  EventData!: any[];
  idevento: any;
  TemplateData!: any[];
  MassiveData!: any;
  PersonData!: any[];
  idpersona!: any;
  SponsorData!: any[];
  SignatureData!: any[];
  selectedTemplate: any;
  selectedPerson: any;
  selectedEvent: any;
  config: any;
  Fecha: Date = new Date();
  eventologo: any;
  value: string = '';
  url: string = '';
  uid: string = '';
  qrCodeDataUrl: string = '';
  titulos: any[] = [];
  showCertified: boolean = false;
  backgroundStyle: object = {
    'background-image': 'url("assets/icons/ucb_logo.png")',
    'opacity': '0.1'
  };

  constructor(
    private certificateService: CertificateService,
    private route: ActivatedRoute,
    private ImageService: ImageService,
    private ngxLoader: NgxUiLoaderService,
    private router: Router,
    private location: Location  ) { }

  ngOnInit(): void {
    this.ngxLoader.start();
    
    this.id = this.route.snapshot.paramMap.get('id');
    this.getData(this.id)
  }

  getData(id: any) {
    this.certificateService.getByCertificate(id).subscribe((data: any[]) => {
      this.MassiveData = data;
      this.uid = this.MassiveData.certificado.uid;
      this.url = environment.apiqr;
      this.value = this.url.concat(this.uid);
      this.generateQRCode(this.value);
      this.EventData = this.MassiveData.evento;
      this.idevento = this.MassiveData.plantilla.id;
      this.eventologo = this.MassiveData.evento.logo;
      this.Fecha = this.MassiveData.evento.fecha;
      this.PersonData = this.MassiveData.personas;
      this.selectedEvent = this.MassiveData.evento.nombre
      this.selectedPerson = this.MassiveData.persona.nombre;
      this.config = JSON.parse(this.MassiveData.plantilla.config);
      this.titulos = Object.keys(this.config);
      this.SponsorData = this.MassiveData.auspiciador;
      this.SignatureData = this.MassiveData.direccion;
      this.showCertified = true
      if (!this.uid) {
        this.router.navigate(['certificado/404']);
      }
    }, (err) => {
      this.router.navigate(['certificado/404']);
    });
    setTimeout(() => {
     const bg = this.getImage(this.eventologo).toString();
      this.backgroundStyle = {
        'background-image': `url(${bg})`,
        'z-index': '-1',
        'opacity': this.config.fondo.opacity
      }; 
      this.generatePDF();
    }, 3000);
  }

  getImage(imagePath: string): SafeUrl {
    return this.ImageService.getImageUCB(imagePath)
  }

  generateQRCode(value: string) {
    const qr = new QRious({
      level: 'H', 
      size: 500,
      value: value
      
    });
    this.qrCodeDataUrl = qr.toDataURL();
  }

  generatePDF(): void {
    const pdfWidth = 1123; // Tamaño horizontal deseado del PDF en píxeles
    const pdfHeight = 794; // Tamaño vertical deseado del PDF en píxeles
    const scale = 2; // Factor de escala para mejorar la nitidez
  
    const content = this.content.nativeElement;
  
    // Obtener posición superior del contenido antes de aplicar la escala
    const initialTop = content.offsetTop;
  
    // Aplicar escala al contenido
    content.style.transform = `scale(${scale})`;
    content.style.transformOrigin = 'top left';
  
    // Calcular la cantidad de desplazamiento vertical necesario para mantener la posición superior
    const verticalOffset = initialTop * (scale - 1);
  
    const captureWidth = content.clientWidth * scale;
    const captureHeight = (content.clientHeight + verticalOffset) * scale;
  
    toBlob(content, {
      width: captureWidth,
      height: captureHeight,
    }).then((blob) => {
      const pdf = new jsPDF({
        orientation: 'l',
        unit: 'px',
        format: [pdfWidth, pdfHeight],
        compress: true,
      });
  
      const imgWidth = pdfWidth;
      const imgHeight = (captureHeight * pdfWidth) / captureWidth;
  
      const imgDataUrl = URL.createObjectURL(blob);
  
      pdf.addImage(imgDataUrl, 'PNG', 0, 0, imgWidth, imgHeight);
      const nombre = this.selectedPerson + '-' + this.selectedEvent + '.pdf';
      // Guardar el PDF
      pdf.save(nombre);
      this.location.back()
      // Restablecer transformación del contenido
      content.style.transform = '';
      content.style.transformOrigin = '';
    });
  }
  
  
}
