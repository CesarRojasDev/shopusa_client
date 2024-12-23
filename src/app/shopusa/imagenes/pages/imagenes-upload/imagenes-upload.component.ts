import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImagenesService } from '../../services/imagenes.service';
import { ProductService } from '../../../productos/services/product.service';
import { Producto } from '../../../interfaces/producto.interface';
import { CloudinaryService } from '../../services/cloudinary.service';

@Component({
  selector: 'shopusa-imagenes-upload',
  templateUrl: './imagenes-upload.component.html',
})
export class ImagenesUploadComponent {
  public myForm: FormGroup;
  public selectedFiles: File[] = []; // Almacena los archivos seleccionados
  public urls: string[] = []; // Almacena las URLs de las imágenes subidas
  public productos: Producto[] = [];
  public productosSinImagenes: Producto[] = []; // Productos sin imágenes
  public selectedProductoId: string = ''; // ID del producto seleccionado

  constructor(
    private imagenesService: ImagenesService,
    private cloudinaryService: CloudinaryService,
    private productService: ProductService,
    private fb: FormBuilder
  ) {
    this.myForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      productoId: [''], // Add form control for selecting productoId
    });

    this.productService.getProducts().subscribe((productos: Producto[]) => {
      this.productosSinImagenes = productos.filter(
        (producto) =>
          !producto.imagenesUrls || producto.imagenesUrls.length === 0
      );
      this.productos = productos;
    });
  }

  onFileChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.selectedFiles = Array.from(files); // Convertimos FileList a Array<File>
    }
  }
  onProductoChange(event: any) {
    this.selectedProductoId = event.target.value;
    console.log('Producto seleccionado con ID:', this.selectedProductoId); // Verifica el ID aquí
  }
  onSubmit(event: Event) {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario

    if (this.selectedFiles.length > 0) {
      const formData = new FormData();
      this.selectedFiles.forEach((file) => formData.append('files', file));

      this.cloudinaryService.uploadImages(formData).subscribe(
        (response) => {
          console.log('Imágenes subidas exitosamente:', response);
          this.urls = response; // Guardar las URLs devueltas por el backend
        },
        (error) => {
          console.error('Error al subir las imágenes:', error);
        }
      );
    } else {
      console.error('No se seleccionaron imágenes.');
    }
  }

  asociarImagenes() {
    if (!this.selectedProductoId || this.urls.length === 0) {
      console.error('Debe seleccionar un producto y subir imágenes.');
      return;
    }

    // Construir el objeto que se enviará al backend
    const imagenDTO = {
      productoId: this.selectedProductoId, // ID del producto
      urls: this.urls, // URLs de las imágenes
    };

    // Llamar al servicio para asociar las imágenes
    this.imagenesService.asociarImagen(imagenDTO).subscribe(
      (response) => {
        console.log('Imágenes asociadas exitosamente:', response);
        alert('Imágenes asociadas correctamente.');
        this.urls = [];
        this.selectedProductoId = '';
      },
      (error) => {
        console.error('Error al asociar imágenes:', error);
      }
    );
  }
}
