<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'order_number', 'status',
        'subtotal', 'shipping_fee', 'discount', 'total',
        'shipping_name', 'shipping_email', 'shipping_phone',
        'shipping_address', 'shipping_city', 'shipping_state',
        'shipping_zip', 'shipping_country',
        'payment_method', 'payment_status', 'notes',
        'paid_at', 'shipped_at', 'completed_at',
    ];

    protected $casts = [
        'subtotal'     => 'decimal:2',
        'shipping_fee' => 'decimal:2',
        'discount'     => 'decimal:2',
        'total'        => 'decimal:2',
        'paid_at'      => 'datetime',
        'shipped_at'   => 'datetime',
        'completed_at' => 'datetime',
    ];

    const STATUSES = [
        'pending'   => ['label' => 'Pending',   'color' => 'yellow'],
        'paid'      => ['label' => 'Paid',       'color' => 'blue'],
        'shipped'   => ['label' => 'Shipped',    'color' => 'purple'],
        'completed' => ['label' => 'Completed',  'color' => 'green'],
        'cancelled' => ['label' => 'Cancelled',  'color' => 'red'],
    ];

    const TRACKING_STEPS = ['pending', 'paid', 'shipped', 'completed'];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($o) {
            $o->order_number = 'LMN-' . strtoupper(uniqid());
        });
    }

    public function user()  { return $this->belongsTo(User::class); }
    public function items() { return $this->hasMany(OrderItem::class); }

    public function getStatusInfoAttribute()
    {
        return self::STATUSES[$this->status] ?? ['label' => 'Unknown', 'color' => 'gray'];
    }

    public function getTrackingStepAttribute()
    {
        $idx = array_search($this->status, self::TRACKING_STEPS);
        return $idx === false ? 0 : $idx;
    }

    public function getCanCancelAttribute()
    {
        return in_array($this->status, ['pending']);
    }
}
