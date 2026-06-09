<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        return [
            ...parent::share($request),
            "auth" => [
                "id" => $user?->id,
                "profile" => $this->resolveProfilePhotoUrl($user?->profile_photo),
                "name" => $user?->name,
                "email" => $user?->email,
                "role" => $user?->role,
            ]
        ];
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
}
