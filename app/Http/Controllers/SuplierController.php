<?php

namespace App\Http\Controllers;

use App\Http\Requests\BulkDeleteSuplierRequest;
use App\Http\Requests\StoreSuplierRequest;
use App\Models\Suplier;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SuplierController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->query('search');
        $city = $request->query('city');
        $province = $request->query('province');

        $supliers = Suplier::query()
            ->when($search, function ($query, $search) {
            return $query->where('name', 'like', '%' . $search . '%');
        })->when($city, function ($query, $city) {
            return $query->where('city', "=", $city);
        })->when($province, function ($query, $province) {
            return $query->where('province', 'like', '%' . $province . '%');
        })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Suplier/Index', [
            'filters' => [
                'search' => $search,
                'city' => $city,
                'province' => $province,
            ],
            'supliers' => $supliers,
        ]);
    }

    public function store(StoreSuplierRequest $request): RedirectResponse
    {
        Suplier::query()->create($request->validated());

        return redirect()
            ->route('suplier.index')
            ->with('success', 'Suplier berhasil ditambahkan.');
    }

    public function update(StoreSuplierRequest $request, Suplier $suplier): RedirectResponse
    {
        $suplier->update($request->validated());

        return redirect()
            ->route('suplier.index')
            ->with('success', 'Suplier berhasil diperbarui.');
    }

    public function destroy(Suplier $suplier): RedirectResponse
    {
        $suplier->delete();

        return redirect()
            ->route('suplier.index')
            ->with('success', 'Suplier berhasil dihapus.');
    }

    public function destroyBulk(BulkDeleteSuplierRequest $request): RedirectResponse
    {
        Suplier::query()
            ->whereIn('id', $request->validated('ids'))
            ->delete();

        return redirect()
            ->route('suplier.index')
            ->with('success', 'Suplier terpilih berhasil dihapus.');
    }
}
