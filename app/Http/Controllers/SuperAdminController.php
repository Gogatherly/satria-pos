<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProfileRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class SuperAdminController extends Controller
{
    public function profile(): Response
    {
        $user = auth()->user();

        return Inertia::render('SuperAdmin/Profile', [
            'name' => $user->name,
            'email' => $user->email,
            'profile' => $this->resolveProfilePhotoUrl($user->profile_photo),
            'role' => $user->role,
        ]);
    }

    public function updateProfile(UpdateProfileRequest $request): RedirectResponse
    {
        $user = $request->user();
        $validated = $request->safe()->except('profile_photo');

        if ($request->hasFile('profile_photo')) {
            $this->deleteStoredProfilePhoto($user->profile_photo);

            $validated['profile_photo'] = $request->file('profile_photo')->store('profile-photos', 'public');
        }

        $user->update($validated);

        return redirect()->route('super-admin.profile');
    }

    private function resolveProfilePhotoUrl(?string $profilePhoto): ?string
    {
        if ($profilePhoto === null || $profilePhoto === '') {
            return null;
        }

        if (Str::startsWith($profilePhoto, ['http://', 'https://', '/storage/'])) {
            return $profilePhoto;
        }

        return Storage::disk('public')->url($profilePhoto);
    }

    private function deleteStoredProfilePhoto(?string $profilePhoto): void
    {
        if ($profilePhoto === null || $profilePhoto === '') {
            return;
        }

        if (Str::startsWith($profilePhoto, ['http://', 'https://'])) {
            return;
        }

        $path = Str::startsWith($profilePhoto, '/storage/')
            ? Str::after($profilePhoto, '/storage/')
            : $profilePhoto;

        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }
}
