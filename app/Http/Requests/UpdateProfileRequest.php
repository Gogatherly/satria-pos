<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($this->user()?->id),
            ],
            'profile_photo' => [
                'nullable',
                File::types(['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'avif', 'heic', 'heif', 'tif', 'tiff'])
                    ->max(5 * 1024),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'profile_photo.types' => 'File foto harus berupa gambar seperti JPG, JPEG, PNG, GIF, WEBP, BMP, AVIF, HEIC, HEIF, TIF, atau TIFF.',
            'profile_photo.max' => 'Ukuran foto maksimal 5 MB.',
        ];
    }
}
