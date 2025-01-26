import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import Swal from 'sweetalert2';

import { CloudinaryService } from '../../services/cloudinary.service';
import { ImagenesService } from '../../services/imagenes.service';
import { Producto } from '../../../interfaces/producto.interface';
import { ProductService } from '../../../productos/services/product.service';

@Component({
  selector: 'shopusa-imagenes-upload',
  templateUrl: './imagenes-upload.component.html',
})
export class ImagenesUploadComponent {
  public myForm: FormGroup;
  public selectedImages: { file: File; previewUrl: string }[] = [];

  public urls: string[] = []; // Almacena las URLs de las imágenes subidas
  public productos: Producto[] = [];
  public productosSinImagenes: Producto[] = []; // Productos sin imágenes
  public selectedProductoId: string = ''; // ID del producto seleccionado

  public isDragging = false; // Variable para cambiar estilos al arrastrar

  public isUploading = false;
  public isUploadedDone = false;
  constructor(
    private imagenesService: ImagenesService,
    private cloudinaryService: CloudinaryService,
    private productService: ProductService,
    private fb: FormBuilder,
  ) {
    this.myForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      productoId: [''], // Control del formulario para seleccionar productoId
    });

    this.productService.getProducts().subscribe((productos: Producto[]) => {
      this.productosSinImagenes = productos.filter(
        (producto) =>
          !producto.imagenesUrls || producto.imagenesUrls.length === 0,
      );
      this.productos = productos;
    });
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;

    if (event.dataTransfer && event.dataTransfer.files) {
      const newFiles = Array.from(event.dataTransfer.files);

      newFiles.forEach((file) => {
        if (
          this.selectedImages.some(
            (img) => img.file.name === file.name && img.file.size === file.size,
          )
        ) {
          Swal.fire({
            title: 'Error!',
            text: `El archivo "${file.name}" ya ha sido seleccionado.`,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        } else {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.selectedImages.push({
              file,
              previewUrl: e.target?.result as string,
            });
          };
          reader.readAsDataURL(file);
        }
      });
    }
  }
  copyToClipboard(url: string): void {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        Swal.fire({
          title: '¡Copiado!',
          text: 'URL copiado al portapapeles.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      })
      .catch((err) => {
        Swal.fire({
          title: '¡Error!',
          text: 'Error al copiar URL.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      });
  }

  onRemoveImage(previewUrl: string): void {
    this.selectedImages = this.selectedImages.filter(
      (img) => img.previewUrl !== previewUrl,
    );
  }

  onRemoveAll(): void {
    this.selectedImages = [];
  }

  onFileChange(event: any): void {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      const files = Array.from(input.files);

      files.forEach((file) => {
        if (
          this.selectedImages.some(
            (img) => img.file.name === file.name && img.file.size === file.size,
          )
        ) {
          Swal.fire({
            title: 'Error!',
            text: `El archivo "${file.name}" ya ha sido seleccionado.`,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        } else {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.selectedImages.push({
              file,
              previewUrl: e.target?.result as string,
            });
          };
          reader.readAsDataURL(file);
        }
      });
    }
  }

  onProductoChange(event: any): void {
    this.selectedProductoId = event.target.value;
    console.log('Producto seleccionado con ID:', this.selectedProductoId);
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.selectedImages.length > 0) {
      this.isUploading = true; // Mostrar el spinner

      const formData = new FormData();
      this.selectedImages.forEach((img) => formData.append('files', img.file));

      this.cloudinaryService.uploadImages(formData).subscribe(
        (response) => {
          console.log('Imágenes subidas exitosamente:', response);
          this.urls = response; // Guardar las URLs devueltas por el backend
          this.isUploading = false; // Ocultar el spinner
          this.isUploadedDone = true;
          Swal.fire({
            title: 'Éxito!',
            text: 'Imágenes subidas correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
        },
        (error) => {
          console.error('Error al subir las imágenes:', error);
          Swal.fire({
            title: 'Error!',
            text: 'Error al subir las imágenes.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
          this.isUploading = false; // Ocultar el spinner
        },
      );
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Debe seleccionar al menos una imagen.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  }

  asociarImagenes(): void {
    if (!this.selectedProductoId || this.urls.length === 0) {
      console.error('Debe seleccionar un producto y subir imágenes.');
      return;
    }

    const imagenDTO = {
      productoId: this.selectedProductoId,
      urls: this.urls,
    };

    this.imagenesService.asociarImagen(imagenDTO).subscribe(
      (response) => {
        console.log('Imágenes asociadas exitosamente:', response);
        Swal.fire({
          title: 'Éxito!',
          text: 'Imágenes asociadas correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });

        this.urls = [];
        this.selectedProductoId = '';
        this.selectedImages = [];
        this.isUploadedDone = false;
        this.isUploading = false;
      },
      (error) => {
        console.error('Error al asociar imágenes:', error);
      },
    );
  }
}
