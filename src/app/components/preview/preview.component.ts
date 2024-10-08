import { Component, ElementRef, ViewChild } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { CertificateService } from 'src/app/services/controllers/certificate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/services/tools/image-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent {
  @ViewChild('content') content!: ElementRef;
  id!: string | null;
  showDownload!: boolean;
  EventData!: any[];
  idevento: any;
  MassiveData!: any;
  PersonData!: any[];
  SponsorData!: any[];
  SignatureData!: any[];
  selectedEvent: any;
  selectedPerson: any;
  config: any;
  Fecha: Date = new Date();
  eventologo: any;
  backgroundStyle: object = {
    'background-image': 'url("assets/icons/ucb_logo.png")',
    'opacity': '0.1'
  };
  value: string = '';
  url: string = environment.apic;
  uid: string = '';
  qrCodeDataUrl: string = '';
  titulos: any[] = [];
  safeUrl!: SafeUrl;
  constructor(
    private certificateService: CertificateService,
    private route: ActivatedRoute,
    private ImageService: ImageService,
    private ngxLoader: NgxUiLoaderService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.route.snapshot.url[1].path === 'chk') {
        this.showDownload = false;
        this.certificateService.isDelivery(this.id, '').subscribe((res: any) => {
        }, (err) => {
        })
      } else if (this.route.snapshot.url[1].path === 'qr') {
        this.showDownload = false;
        this.certificateService.isCheck(this.id, '').subscribe((res: any) => {
        }, (err) => {
        })
      }
      else if (this.route.snapshot.url[1].path === 'codigo') {
        this.showDownload = true;
      }
      if (this.id === 'sin_certificado') {
        this.router.navigate(['certificado/404']);
      } else {
        this.ngxLoader.start();
        this.getData(this.id)
      }
    });
  }

  getData(id: any) {
    this.certificateService.getByCertificate(id).subscribe((data: any[]) => {
      this.MassiveData = data;
      this.uid = this.MassiveData.certificado.uid;
      this.value = this.url.concat(this.uid);
      this.EventData = this.MassiveData.evento;
      this.idevento = this.MassiveData.plantilla.id;
      this.eventologo = this.MassiveData.evento.logo;
      this.Fecha = this.MassiveData.evento.fecha;
      this.selectedEvent = this.MassiveData.evento.nombre
      this.PersonData = this.MassiveData.personas;
      this.selectedPerson = this.MassiveData.persona.nombre;
      this.config = JSON.parse(this.MassiveData.plantilla.config);
      this.titulos = Object.keys(this.config);
      this.SponsorData = this.MassiveData.auspiciador;
      this.SignatureData = this.MassiveData.direccion;

      setTimeout(() => {
        const bg = this.getImage(this.eventologo).toString();
        this.backgroundStyle = {
          'background-image': `url(${bg})`,
          'z-index': '-1',
          'opacity': this.config.fondo.opacity
        };
      }, 1000);

      this.ngxLoader.stop();

      if (!this.uid) {
        this.router.navigate(['certificado/404']);
      }
    }, (err) => {
      this.router.navigate(['certificado/404']);
    });
  }


  getSafeUrlAsString(): string {
    return this.safeUrl.toString();
  }

  getImage(imagePath: string): SafeUrl {
    return this.ImageService.getImageUCB(imagePath)
  }

  generatePDF() {
    this.router.navigateByUrl('certificado/pdf/' + this.id);
    this.certificateService.isDownload(this.id, '').subscribe((res: any) => {
    }, (error) => {
      console.log(error)
    })
  }

}