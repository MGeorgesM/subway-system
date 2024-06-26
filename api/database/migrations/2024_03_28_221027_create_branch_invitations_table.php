<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('branch_invitations', function (Blueprint $table) {
            $table->id();
            $table->string('branch_email');
            $table->dateTime('expires_at')->default(now()->addMinutes(30));
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('branch_invitations');
    }
};
