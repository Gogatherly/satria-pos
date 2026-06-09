<?php

namespace Tests\Feature\SuperAdmin;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class UpdateProfilePhotoTest extends TestCase
{
    use RefreshDatabase;

    #[DataProvider('supportedImageProvider')]
    public function test_super_admin_can_upload_supported_profile_photo(string $filename): void
    {
        Storage::fake('public');

        $user = User::factory()->create([
            'role' => 'super_admin',
        ]);

        $response = $this->actingAs($user)->patch(route('super-admin.profile.update'), [
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
            'profile_photo' => UploadedFile::fake()->image($filename),
        ]);

        $response->assertRedirect(route('super-admin.profile'));

        $user->refresh();

        $this->assertSame('Updated Name', $user->name);
        $this->assertSame('updated@example.com', $user->email);
        $this->assertNotNull($user->profile_photo);
        Storage::disk('public')->assertExists($user->profile_photo);
    }

    public function test_profile_photo_must_be_an_image_file(): void
    {
        Storage::fake('public');

        $user = User::factory()->create([
            'role' => 'super_admin',
        ]);

        $response = $this
            ->from(route('super-admin.profile'))
            ->actingAs($user)
            ->patch(route('super-admin.profile.update'), [
                'name' => $user->name,
                'email' => $user->email,
                'profile_photo' => UploadedFile::fake()->create('document.pdf', 128, 'application/pdf'),
            ]);

        $response->assertRedirect(route('super-admin.profile'));
        $response->assertSessionHasErrors(['profile_photo']);

        $user->refresh();

        $this->assertNull($user->profile_photo);
        Storage::disk('public')->assertDirectoryEmpty('profile-photos');
    }

    public static function supportedImageProvider(): array
    {
        return [
            'jpg' => ['avatar.jpg'],
            'jpeg' => ['avatar.jpeg'],
            'png' => ['avatar.png'],
        ];
    }
}
