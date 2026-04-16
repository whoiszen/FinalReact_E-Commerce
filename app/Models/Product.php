<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name', 'slug', 'description', 'short_description',
        'price', 'sale_price', 'category', 'material',
        'carat', 'metal', 'certification', 'stock',
        'images', 'tags', 'is_featured', 'is_active',
        'rating', 'reviews_count',
    ];

    protected $casts = [
        'images'       => 'array',
        'tags'         => 'array',
        'is_featured'  => 'boolean',
        'is_active'    => 'boolean',
        'price'        => 'decimal:2',
        'sale_price'   => 'decimal:2',
    ];

    const CATEGORIES = [
        'diamond-rings'     => 'Diamond Rings',
        'diamond-necklaces' => 'Diamond Necklaces',
        'diamond-bracelets' => 'Diamond Bracelets',
        'diamond-earrings'  => 'Diamond Earrings',
        'diamond-watches'   => 'Diamond Watches',
        'diamond-pendants'  => 'Diamond Pendants',
        'loose-diamonds'    => 'Loose Diamonds',
    ];

    const LOW_STOCK_THRESHOLD = 5;

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($p) {
            if (empty($p->slug)) {
                $p->slug = Str::slug($p->name) . '-' . Str::random(5);
            }
        });
    }

    public function cartItems()  { return $this->hasMany(CartItem::class); }
    public function orderItems() { return $this->hasMany(OrderItem::class); }
    public function wishlists()  { return $this->hasMany(Wishlist::class); }

    // Accessors
    public function getCurrentPriceAttribute()
    {
        return $this->sale_price ?? $this->price;
    }

    public function getIsOnSaleAttribute()
    {
        return !is_null($this->sale_price) && $this->sale_price < $this->price;
    }

    public function getDiscountPercentageAttribute()
    {
        if ($this->is_on_sale) {
            return round((($this->price - $this->sale_price) / $this->price) * 100);
        }
        return 0;
    }

    public function getImagesAttribute($value)
    {
        $images = (is_array($value) ? $value : json_decode($value, true)) ?: [];

        return array_map(function ($image) {
            if (empty($image)) {
                return $image;
            }
            if (Str::startsWith($image, ['http://', 'https://'])) {
                return $image;
            }
            if (Str::startsWith($image, ['/storage/', 'storage/'])) {
                return asset(ltrim($image, '/'));
            }
            return asset('storage/' . ltrim($image, '/'));
        }, $images);
    }

    public function getPrimaryImageAttribute()
    {
        $images = $this->images ?? [];
        return $images[0] ?? null;
    }

    public function getCategoryLabelAttribute()
    {
        return self::CATEGORIES[$this->category] ?? ucfirst($this->category);
    }

    public function getIsLowStockAttribute()
    {
        return $this->stock <= self::LOW_STOCK_THRESHOLD && $this->stock > 0;
    }

    // Scopes
    public function scopeActive($q)               { return $q->where('is_active', true); }
    public function scopeFeatured($q)             { return $q->where('is_featured', true); }
    public function scopeByCategory($q, $cat)     { return $q->where('category', $cat); }
    public function scopeInStock($q)              { return $q->where('stock', '>', 0); }
    public function scopeLowStock($q)             { return $q->where('stock', '<=', self::LOW_STOCK_THRESHOLD)->where('stock', '>', 0); }

    public function scopeSearch($q, $term)
    {
        return $q->where(function ($query) use ($term) {
            $query->where('name', 'LIKE', "%{$term}%")
                  ->orWhere('description', 'LIKE', "%{$term}%")
                  ->orWhere('category', 'LIKE', "%{$term}%")
                  ->orWhere('material', 'LIKE', "%{$term}%")
                  ->orWhere('metal', 'LIKE', "%{$term}%");
        });
    }
}
